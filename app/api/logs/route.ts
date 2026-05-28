import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';
const API_KEY = process.env.API_KEY || '';

const LogSchema = new mongoose.Schema({
  level:     { type: String },
  message:   { type: String },
  timestamp: { type: Date },
  guildId:   { type: String },
  userId:    { type: String },
  channelId: { type: String },
  metadata:  { type: mongoose.Schema.Types.Mixed },
}, { strict: false });

let Log: mongoose.Model<any>;
try {
  Log = mongoose.model('LuviLog');
} catch {
  Log = mongoose.model('LuviLog', LogSchema, 'logs');
}

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI, {
    dbName: 'luvi',
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  });
}

function deriveCategory(message: string, metadata?: any): string {
  if (metadata?.category) return metadata.category;
  const m = (message || '').toLowerCase();
  if (m.includes('boss') || m.includes('tier')) return 'BOSS';
  if (m.includes('reminder') || m.includes('stamina') || m.includes('expedition') || m.includes('raid')) return 'REMINDER';
  if (m.includes('drop')) return 'DROP';
  if (m.includes('ready') || m.includes('bot_ready') || m.includes('scheduler') || m.includes('system')) return 'SYSTEM';
  if (m.includes('wishlist')) return 'WISHLIST';
  return 'GENERAL';
}

function cleanMetadata(metadata: any): Record<string, any> | null {
  if (!metadata) return null;
  // filter out char-array keys (0,1,2...) — these are stringified errors stored wrong
  const cleaned: Record<string, any> = {};
  for (const [k, v] of Object.entries(metadata)) {
    if (isNaN(Number(k))) cleaned[k] = v;
  }
  return Object.keys(cleaned).length > 0 ? cleaned : null;
}

export async function GET(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== API_KEY) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();

    const sp = request.nextUrl.searchParams;
    const limit  = Math.min(parseInt(sp.get('limit')  || '50'), 200);
    const offset = parseInt(sp.get('offset') || '0');
    const level    = sp.get('level');
    const category = sp.get('category');
    const search   = sp.get('search');
    const userId   = sp.get('userId');
    const guildId  = sp.get('guildId');
    const range    = sp.get('range');

    const rangeMs: Record<string, number> = { '1h': 3600000, '6h': 21600000, '24h': 86400000, '7d': 604800000 };

    const query: any = {};
    if (level)   query.level = level.toUpperCase();
    if (userId)  query.userId = userId;
    if (guildId) query.guildId = guildId;
    if (range && rangeMs[range]) query.timestamp = { $gte: new Date(Date.now() - rangeMs[range]) };
    if (search)  query.$or = [
      { message:  { $regex: search, $options: 'i' } },
      { userId:   { $regex: search, $options: 'i' } },
      { guildId:  { $regex: search, $options: 'i' } },
      { 'metadata.category': { $regex: search, $options: 'i' } },
    ];

    const [rawLogs, total] = await Promise.all([
      Log.find(query).sort({ timestamp: -1 }).skip(offset).limit(limit).lean(),
      Log.countDocuments(query),
    ]);

    const logs = rawLogs
      .filter((log: any) => {
        if (!category) return true;
        return (log.metadata?.category || deriveCategory(log.message, log.metadata)) === category;
      })
      .map((log: any) => ({
        id:        log._id.toString(),
        level:     (log.level || 'INFO').toUpperCase(),
        message:   log.message || '',
        timestamp: log.timestamp,
        guildId:   log.guildId   || log.metadata?.guildId,
        userId:    log.userId    || log.metadata?.userId,
        channelId: log.channelId || log.metadata?.channelId,
        category:  log.metadata?.category || deriveCategory(log.message, log.metadata),
        action:    log.metadata?.action,
        type:      log.metadata?.type,
        method:    log.metadata?.method,
        error:     log.metadata?.error,
        metadata:  cleanMetadata(log.metadata),
      }));

    return NextResponse.json({ logs, total });
  } catch (error) {
    console.error('Logs API error:', error);
    return NextResponse.json({ error: 'Failed to fetch logs', detail: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== API_KEY) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    await Log.deleteMany({});
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to clear logs' }, { status: 500 });
  }
}
