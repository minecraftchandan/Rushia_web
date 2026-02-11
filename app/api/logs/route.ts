import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';
const API_KEY = process.env.API_KEY || '';

const LogSchema = new mongoose.Schema({
  level: String,
  message: String,
  timestamp: Date,
  userId: String,
  guildId: String,
  channelId: String,
  metadata: Object,
});

const Log = mongoose.models.Log || mongoose.model('Log', LogSchema, 'logs');

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

function categorizeLog(message: string, metadata?: any): string {
  if (metadata?.category === 'RAID_SPAWN') return 'RAID_SPAWN';
  if (metadata?.category === 'SYSTEM') return 'SYSTEM';
  if (metadata?.category === 'DROP' || metadata?.category === 'DROP_COUNT' || metadata?.category === 'RARITY_DROP') return 'DROP';
  if (metadata?.category === 'REMINDER') return 'REMINDER';
  
  const msg = message.toLowerCase();
  if (msg.includes('raid') || msg.includes('boss')) return 'RAID_SPAWN';
  if (msg.includes('reminder')) return 'REMINDER';
  if (msg.includes('expedition')) return 'EXPEDITION';
  if (msg.includes('drop')) return 'DROP';
  if (msg.includes('bot_ready') || msg.includes('settings') || msg.includes('scheduler')) return 'SYSTEM';
  
  return 'GENERAL';
}

function getReminderType(metadata?: any): string | undefined {
  return metadata?.type;
}

export async function GET(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const level = searchParams.get('level');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const userId = searchParams.get('userId');
    const reminderType = searchParams.get('reminderType');

    const query: any = {};
    if (level) query.level = level;
    if (userId) query.userId = userId;
    if (search) {
      query.$or = [
        { message: { $regex: search, $options: 'i' } },
        { userId: { $regex: search, $options: 'i' } },
        { guildId: { $regex: search, $options: 'i' } },
      ];
    }

    const [logs, total] = await Promise.all([
      Log.find(query)
        .sort({ timestamp: -1 })
        .skip(offset)
        .limit(limit)
        .lean(),
      Log.countDocuments(query)
    ]);

    const formattedLogs = logs.map(log => {
      const cat = categorizeLog(log.message, log.metadata);
      const remType = getReminderType(log.metadata);
      return {
        id: log._id.toString(),
        timestamp: log.timestamp,
        level: log.level || 'INFO',
        category: cat,
        message: log.message,
        userId: log.userId,
        guildId: log.guildId,
        channelId: log.channelId,
        reminderType: remType,
        action: log.metadata?.action,
        method: log.metadata?.method,
        error: log.metadata?.error,
      };
    }).filter(log => {
      if (category && log.category !== category) return false;
      if (reminderType && log.reminderType !== reminderType) return false;
      return true;
    });

    return NextResponse.json({ logs: formattedLogs, total: category || reminderType ? formattedLogs.length : total });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    await Log.deleteMany({});
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to clear logs' }, { status: 500 });
  }
}