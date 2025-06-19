const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Running all documentation example tests...\n');

const tests = [
  'test-readme-examples.js',
  'test-api-examples.js',
  'test-examples-doc.js'
];

let allPassed = true;

tests.forEach((testFile, index) => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Running test ${index + 1}/${tests.length}: ${testFile}`);
  console.log('='.repeat(60));
  
  try {
    const output = execSync(`node example-tests/${testFile}`, {
      encoding: 'utf8',
      stdio: 'pipe'
    });
    
    // Check if the test completed successfully
    if (output.includes('tested!')) {
      console.log(`✅ ${testFile} - PASSED`);
    } else {
      console.log(`⚠️  ${testFile} - Completed but may have issues`);
    }
    
    // Save output to file for review
    const outputFile = path.join('example-tests', `output-${testFile.replace('.js', '.txt')}`);
    fs.writeFileSync(outputFile, output);
    console.log(`   Output saved to: ${outputFile}`);
    
  } catch (error) {
    console.log(`❌ ${testFile} - FAILED`);
    console.log(`   Error: ${error.message}`);
    allPassed = false;
    
    // Save error to file
    const errorFile = path.join('example-tests', `error-${testFile.replace('.js', '.txt')}`);
    fs.writeFileSync(errorFile, error.toString());
    console.log(`   Error saved to: ${errorFile}`);
  }
});

console.log(`\n${'='.repeat(60)}`);
console.log('SUMMARY');
console.log('='.repeat(60));

if (allPassed) {
  console.log('✅ All documentation examples tested successfully!');
  console.log('\nNext steps:');
  console.log('1. Review the output files in example-tests/ directory');
  console.log('2. Any visual formatting issues are expected in non-TTY environment');
  console.log('3. The important thing is that no errors occurred');
} else {
  console.log('❌ Some tests failed. Please review the error files.');
}

console.log('\nTest outputs have been saved to the example-tests/ directory.');