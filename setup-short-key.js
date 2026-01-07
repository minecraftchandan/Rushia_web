// Paste this in browser console to generate your short key hash
// Then update NEXT_PUBLIC_API_KEY in .env.local with the generated hash

async function createShortKey(shortKey) {
  const encoder = new TextEncoder();
  const data = encoder.encode(shortKey);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  console.log('='.repeat(60));
  console.log('✅ Your Short Access Key Setup:');
  console.log('='.repeat(60));
  console.log('\n📝 Short Key (share this with users):');
  console.log(`   "${shortKey}"`);
  console.log('\n🔐 Hash (put this in .env.local):');
  console.log(`   NEXT_PUBLIC_API_KEY=${hash}`);
  console.log('\n' + '='.repeat(60));
}

// Choose your short memorable key here:
createShortKey('rushia-admin');

// Try other options:
// createShortKey('logs2024');
// createShortKey('helper-bot');
// createShortKey('admin');
