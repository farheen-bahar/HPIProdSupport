const excelToJson = require('convert-excel-to-json');
const officegen = require('officegen');
const fs = require('fs');

const xlsx = officegen('xlsx');
const result = excelToJson({ source: fs.readFileSync('./downloads/incident.xlsx') });

// console.log('result', result['Page 1']);

// Officegen calling this function after finishing to generate the xlsx document:
xlsx.on('finalize', () => console.log('Finished'));

// Officegen calling this function to report errors:
xlsx.on('error', (err) => console.log(err));

// Data Processing
const sheet = xlsx.makeNewSheet();
result['Page 1'].map((row, index) => {
  Object.keys(row).map((key) => {
    sheet.setCell(`${key}${index + 1}`, row[key].toString());
  });
  if (index === 0) {
    sheet.setCell(`P${index + 1}`, 'Aging days');
  } else {
    sheet.setCell(`P${index + 1}`, Math.ceil(((Date.parse(Date()) - Date.parse(row['F'])) / 1000) / 86400));
  }
})

// Let's generate the Excel document into a file:
const out = fs.createWriteStream('./downloads/example.xlsx');

out.on('error', (err) => console.log(err));

// Async call to generate the output file:
xlsx.generate(out);