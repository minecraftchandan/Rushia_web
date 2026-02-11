const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://notmod:botmod@cluster0.kihgv7j.mongodb.net/luvi?appName=Cluster0';

async function checkDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const total = await db.collection('logs').countDocuments();
    const logs = await db.collection('logs').find().toArray();
    
    console.log(`\n=== Total logs in DB: ${total} ===\n`);
    
    // Group by message patterns
    const patterns = {};
    const levels = {};
    const metadataCategories = new Set();
    
    logs.forEach(log => {
      // Count levels
      levels[log.level] = (levels[log.level] || 0) + 1;
      
      // Extract patterns
      const pattern = log.message.split(/[\[\]]/)[1] || log.message.substring(0, 30);
      patterns[pattern] = (patterns[pattern] || 0) + 1;
      
      // Check metadata
      if (log.metadata?.category) metadataCategories.add(log.metadata.category);
    });
    
    console.log('=== Levels ===');
    Object.entries(levels).forEach(([k, v]) => console.log(`${k}: ${v}`));
    
    console.log('\n=== Top Message Patterns ===');
    Object.entries(patterns)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)
      .forEach(([k, v]) => console.log(`${k}: ${v}`));
    
    console.log('\n=== Metadata Categories ===');
    console.log(Array.from(metadataCategories));
    
    console.log('\n=== Sample Logs by Type ===');
    
    // Show samples of different types
    const samples = {
      'RAID/BOSS': logs.find(l => l.message.includes('RAID') || l.message.includes('Boss')),
      'REMINDER': logs.find(l => l.message.includes('REMINDER')),
      'EXPEDITION': logs.find(l => l.message.includes('EXPEDITION')),
      'MESSAGE': logs.find(l => l.message.includes('MESSAGE')),
      'SCHEDULER': logs.find(l => l.message.includes('SCHEDULER')),
      'ERROR': logs.find(l => l.level === 'ERROR'),
      'CARD': logs.find(l => l.message.includes('card') || l.message.includes('Card')),
    };
    
    Object.entries(samples).forEach(([type, log]) => {
      if (log) {
        console.log(`\n--- ${type} ---`);
        console.log(JSON.stringify(log, null, 2));
      }
    });
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkDB();
