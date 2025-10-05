const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Input and output paths (adjust if needed)
const inputPath = path.join(process.cwd(), 'output', 'result.csv');
const outputPath = path.join(process.cwd(), 'output', 'cleaned_result.csv');

// Function to check if a value is empty ('' or falsy)
function isEmpty(value) {
  return !value || value.toString().trim() === '';
}

// Main function to clean the CSV
async function cleanCSV() {
  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    return;
  }

  const rows = [];
  let headers = [];

  // Read the input CSV
  await new Promise((resolve, reject) => {
    fs.createReadStream(inputPath)
      .pipe(csvParser())
      .on('headers', (fileHeaders) => {
        headers = fileHeaders;
        console.log(`Found ${headers.length} columns in input CSV.`);
      })
      .on('data', (row) => rows.push(row))
      .on('end', resolve)
      .on('error', reject);
  });

  if (rows.length === 0) {
    console.warn('No rows found in the input CSV. Output will be empty.');
    return;
  }

  // Determine non-empty columns (those with at least one non-empty value)
  const nonEmptyColumns = headers.filter(header => {
    return rows.some(row => !isEmpty(row[header]));
  });

  console.log(`Found ${nonEmptyColumns.length} non-empty columns (removed ${headers.length - nonEmptyColumns.length} empty ones).`);

  if (nonEmptyColumns.length === 0) {
    console.warn('All columns are empty. Outputting empty CSV.');
  }

  // Filter rows to only include non-empty columns
  const filteredRows = rows.map(row => {
    const filteredRow = {};
    nonEmptyColumns.forEach(header => {
      filteredRow[header] = row[header] || '';  // Ensure empty strings for consistency
    });
    return filteredRow;
  });

  // Write the cleaned CSV
  const csvWriter = createCsvWriter({
    path: outputPath,
    header: nonEmptyColumns.map(header => ({ id: header, title: header }))
  });

  await csvWriter.writeRecords(filteredRows);
  console.log(`Cleaned CSV written to ${outputPath} with ${filteredRows.length} rows and ${nonEmptyColumns.length} columns.`);
}

cleanCSV().catch(err => console.error('Error:', err));