// Run this in Node.js to find a short key
// node generate-key.js

const crypto = require('crypto');

const TARGET_HASH = 'cea78a4e85c2438165c9bb90d8bf41a2a4e5fca0e0e487b4b7fdd20cec6be7ba';

// Try some memorable keys
const candidates = [
  'rushia',
  'rushia2024',
  'admin',
  'logs',
  'rushia-logs',
  'helper-bot',
  'luvi-card',
  'discord-bot',
  'bot-admin',
  'rushia-admin'
];

console.log('Finding short keys that hash to your API key...\n');

candidates.forEach(key => {
  const hash = crypto.createHash('sha256').update(key).digest('hex');
  console.log(`Key: "${key}"`);
  console.log(`Hash: ${hash}`);
  console.log(`Match: ${hash === TARGET_HASH ? '✅ YES!' : '❌ No'}\n`);
});

console.log('\n💡 Tip: You can still use the full API key as well!');
console.log('The system accepts both the short key (hashed) and the full API key.');
