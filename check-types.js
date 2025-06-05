// check-types.js
const { exec } = require('child_process');

console.log('🔍 Checking TypeScript compilation...');

exec('npx tsc --noEmit', (error, stdout, stderr) => {
  if (error) {
    console.error('❌ TypeScript errors found:');
    console.error(stderr);
    process.exit(1);
  } else {
    console.log('✅ No TypeScript errors found!');
    console.log('🚀 Ready to start the server');
  }
});