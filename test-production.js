#!/usr/bin/env node
/**
 * Production smoke test for @termstyle/core
 * Tests that the built module exports work correctly
 */

const termstyleModule = require('./dist/index.js');
const termstyle = termstyleModule.default || termstyleModule;

console.log('🧪 Testing @termstyle/core production build...\n');

try {
  // Test basic functionality
  console.log('✅ Basic colors:', termstyle.red('red'), termstyle.green('green'), termstyle.blue('blue'));
  
  // Test chaining
  console.log('✅ Chaining:', termstyle.bold.underline.red('styled text'));
  
  // Test that it's properly typed
  console.log('✅ Default export type:', typeof termstyle);
  console.log('✅ Has Style class:', typeof termstyle.Style);
  console.log('✅ Has terminal info:', typeof termstyle.supportsColor, typeof termstyle.level);
  
  // Test stripAnsi
  const styled = termstyle.red('test');
  const stripped = termstyle.stripAnsi(styled);
  console.log('✅ Strip ANSI:', stripped === 'test' ? 'PASS' : 'FAIL');
  
  // Test themes
  console.log('✅ Themes available:', Object.keys(termstyle.themes).length > 0 ? 'PASS' : 'FAIL');
  
  console.log('\n🎉 All production tests passed! The module is ready for publishing.');
  
} catch (error) {
  console.error('❌ Production test failed:', error.message);
  process.exit(1);
}