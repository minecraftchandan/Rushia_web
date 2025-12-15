import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

let cached: typeof mongoose | null = null;

async function connectDB() {
  if (cached) return cached;
  
  const conn = await mongoose.connect(process.env.MONGODB_URI!);
  cached = conn;
  return conn;
}

export async function GET() {
  try {
    await connectDB();
    
    const db = mongoose.connection.db;
    
    const guildsCollection = db.collection('guilds');
    const serverCount = await guildsCollection.countDocuments();
    
    const logsCollection = db.collection('logs');
    
    const remindersSent = await logsCollection.countDocuments({
      message: { $regex: /REMINDER SENT/i }
    });
    
    const bossDetections = await logsCollection.countDocuments({
      message: { $regex: /BOSS DETECTED/i }
    });
    
    const cardDetections = await logsCollection.countDocuments({
      message: { $regex: /CARD DETECTED/i }
    });
    
    const expeditionReminders = await logsCollection.countDocuments({
      message: { $regex: /EXPEDITION REMINDER SET/i }
    });
    
    const staminaReminders = await logsCollection.countDocuments({
      message: { $regex: /STAMINA REMINDER SET/i }
    });
    
    const raidReminders = await logsCollection.countDocuments({
      message: { $regex: /RAID REMINDER SET/i }
    });
    
    const totalCommands = bossDetections + cardDetections + expeditionReminders + 
                         staminaReminders + raidReminders;
    
    const remindersCollection = db.collection('reminders');
    const activeReminders = await remindersCollection.countDocuments();
    
    const estimatedUsers = serverCount * 100;
    
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentActivity = await logsCollection.countDocuments({
      timestamp: { $gte: yesterday }
    });
    
    const stats = {
      servers: serverCount,
      users: estimatedUsers,
      commandsUsed: totalCommands,
      remindersSent: remindersSent,
      activeReminders: activeReminders,
      bossDetections: bossDetections,
      cardDetections: cardDetections,
      recentActivity: recentActivity,
      lastUpdated: new Date().toISOString()
    };
    
    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 's-maxage=300, stale-while-revalidate'
      }
    });
    
  } catch (error) {
    console.error('Stats API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
