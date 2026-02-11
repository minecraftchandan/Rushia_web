import { NextResponse, NextRequest } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';
const API_KEY = process.env.API_KEY || '';

const LogSchema = new mongoose.Schema({
  level: String,
  message: String,
  timestamp: Date,
});

const Log = mongoose.models.Log || mongoose.model('Log', LogSchema, 'logs');

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

export async function GET(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    
    const [total, lastHour, byLevel] = await Promise.all([
      Log.countDocuments(),
      Log.countDocuments({ timestamp: { $gte: oneHourAgo } }),
      Log.aggregate([
        { $group: { _id: '$level', count: { $sum: 1 } } }
      ])
    ]);

    const levelCounts = byLevel.reduce((acc: any, item: any) => {
      acc[item._id || 'INFO'] = item.count;
      return acc;
    }, {});

    return NextResponse.json({
      total,
      lastHour,
      byLevel: {
        ERROR: levelCounts.ERROR || 0,
        WARN: levelCounts.WARN || 0,
        INFO: levelCounts.INFO || 0,
        DEBUG: levelCounts.DEBUG || 0,
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
