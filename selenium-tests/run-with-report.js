// Helper to run mocha programmatically so we can capture results and write Excel report
const Mocha = require('mocha');
const path = require('path');
const reporter = require('./utils/excelReporter');

async function run() {
  const mocha = new Mocha({ timeout: 120000 });
  mocha.addFile(path.join(__dirname, 'tests', 'common.js'));

  // Add all tests
  const testsDir = path.join(__dirname, 'tests');
  const fs = require('fs');
  fs.readdirSync(testsDir).filter(f => f.endsWith('.spec.js') && f !== 'common.js')
    .forEach(f => mocha.addFile(path.join(testsDir, f)));

  const runner = mocha.run(async failures => {
    // runner events wrote results via common hooks; grab them
    const results = global.__TEST_RESULTS__ || [];
    await reporter.writeExcelReport(results, path.join(__dirname, 'reports', 'test-results.xlsx'));
    process.exit(failures ? 1 : 0);
  });

  runner.on('end', () => {
    // noop
  });
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
