const ExcelJS = require('exceljs');
const fs = require('fs');

async function writeExcelReport(results, outPath) {
  const workbook = new ExcelJS.Workbook();
  const summary = workbook.addWorksheet('Summary');
  const details = workbook.addWorksheet('Details');

  summary.columns = [
    { header: 'Total Tests', key: 'total', width: 12 },
    { header: 'Passed', key: 'passed', width: 10 },
    { header: 'Failed', key: 'failed', width: 10 },
    { header: 'Duration ms', key: 'duration', width: 14 }
  ];

  const total = results.length;
  const passed = results.filter(r => r.status === 'passed').length;
  const failed = results.filter(r => r.status === 'failed').length;
  const duration = results.reduce((s, r) => s + (r.duration || 0), 0);

  summary.addRow({ total, passed, failed, duration });

  details.columns = [
    { header: 'Suite', key: 'suite', width: 30 },
    { header: 'Test', key: 'test', width: 60 },
    { header: 'Status', key: 'status', width: 12 },
    { header: 'Duration ms', key: 'duration', width: 14 },
    { header: 'Error', key: 'error', width: 80 }
  ];

  results.forEach(r => {
    details.addRow({ suite: r.suite, test: r.title, status: r.status, duration: r.duration || 0, error: r.error || '' });
  });

  // Ensure reports folder exists
  const dir = require('path').dirname(outPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await workbook.xlsx.writeFile(outPath);
  console.log('Excel report written to', outPath);
}

module.exports = { writeExcelReport };
