import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }
}

export async function GET() {
  try {
    await connectDB();
    const db = mongoose.connection.db;

    const [
      serverCount,
      userCount,
      totalDrops,
    ] = await Promise.all([
      db.collection('guilds').countDocuments(),
      db.collection('users').countDocuments(),
      db.collection('drops').aggregate([{ $group: { _id: null, total: { $sum: '$drop_count' } } }]).toArray(),
    ]);

    const commandsUsed = totalDrops[0]?.total || 0;

    return NextResponse.json({
      servers: serverCount,
      users: userCount,
      commandsUsed,
      remindersSent: 0,
    }, {
      headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate' }
    });

  } catch (error) {
    console.error('Stats API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
