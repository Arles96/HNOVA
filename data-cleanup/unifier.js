const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Unified headers from ExoplanetData interface (in order, with isExoplanet second)
const unifiedHeaders = [
  'hostId', 'isExoplanet', 'planetName', 'hostName', 'planetLetter', 'k2Id', 'toi', 'tid', 'kepoiName',
  'orbitalPeriod', 'orbitalPeriodMin', 'orbitalPeriodMax', 'orbitSemiMajorAxis', 'orbitSemiMajorAxisMin', 'orbitSemiMajorAxisMax',
  'eccentricity', 'eccentricityMin', 'eccentricityMax', 'inclination', 'inclinationMin', 'inclinationMax',
  'transitDuration', 'transitDurationMin', 'transitDurationMax', 'transitDepth', 'transitDepthMin', 'transitDepthMax',
  'impactParameter', 'impactParameterMin', 'impactParameterMax',
  'planetRadiusEarth', 'planetRadiusEarthMin', 'planetRadiusEarthMax', 'planetRadiusJupiter', 'planetRadiusJupiterMin', 'planetRadiusJupiterMax',
  'planetMassEarth', 'planetMassEarthMin', 'planetMassEarthMax', 'planetMassJupiter', 'planetMassJupiterMin', 'planetMassJupiterMax',
  'planetDensity', 'planetDensityMin', 'planetDensityMax', 'equilibriumTemperature', 'equilibriumTemperatureMin', 'equilibriumTemperatureMax',
  'insolationFlux', 'insolationFluxMin', 'insolationFluxMax',
  'stellarEffectiveTemperature', 'stellarEffectiveTemperatureMin', 'stellarEffectiveTemperatureMax',
  'stellarSurfaceGravity', 'stellarSurfaceGravityMin', 'stellarSurfaceGravityMax',
  'stellarRadius', 'stellarRadiusMin', 'stellarRadiusMax',
  'stellarMass', 'stellarMassMin', 'stellarMassMax',
  'stellarMetallicity', 'stellarMetallicityMin', 'stellarMetallicityMax',
  'stellarAge', 'stellarAgeMin', 'stellarAgeMax',
  'rightAscension', 'declination', 'magnitude',
  'dispositionScore', 'modelSnr', 'tcePlanetNumber', 'tfopwgDisposition'
];

// Mappings from original headers to unified headers (based on unification logic)
const headerMappings = {
  // IDs/Names
  'kepid': 'hostId', 'epic_id': 'hostId', 'tic_id': 'hostId',
  'kepler_name': 'planetName', 'pl_name': 'planetName',
  'hostname': 'hostName',
  'k2_name': 'k2Id',  // Assuming k2_name from research, adjust if needed
  'toi': 'toi', 'tid': 'tid', 'kepoi_name': 'kepoiName',

  // Orbital
  'koi_period': 'orbitalPeriod', 'pl_orbper': 'orbitalPeriod',
  'koi_period_err1': 'orbitalPeriodMin', 'koi_period_err2': 'orbitalPeriodMax',
  'pl_orbpererr1': 'orbitalPeriodMin', 'pl_orbpererr2': 'orbitalPeriodMax',

  // Transit
  'koi_duration': 'transitDuration', 'pl_trandur': 'transitDuration',
  'koi_duration_err1': 'transitDurationMin', 'koi_duration_err2': 'transitDurationMax',
  'pl_trandurerr1': 'transitDurationMin', 'pl_trandurerr2': 'transitDurationMax',
  'koi_depth': 'transitDepth', 'pl_trandep': 'transitDepth',
  'koi_depth_err1': 'transitDepthMin', 'koi_depth_err2': 'transitDepthMax',
  'pl_trandeperr1': 'transitDepthMin', 'pl_trandeperr2': 'transitDepthMax',
  'koi_impact': 'impactParameter', 'koi_impact_err1': 'impactParameterMin', 'koi_impact_err2': 'impactParameterMax',

  // Planet Physical
  'koi_prad': 'planetRadiusEarth', 'pl_rade': 'planetRadiusEarth',
  'koi_prad_err1': 'planetRadiusEarthMin', 'koi_prad_err2': 'planetRadiusEarthMax',
  'pl_radeerr1': 'planetRadiusEarthMin', 'pl_radeerr2': 'planetRadiusEarthMax',
  'pl_radj': 'planetRadiusJupiter', 'pl_radjerr1': 'planetRadiusJupiterMin', 'pl_radjerr2': 'planetRadiusJupiterMax',
  'pl_bmasse': 'planetMassEarth', 'pl_bmasseerr1': 'planetMassEarthMin', 'pl_bmasseerr2': 'planetMassEarthMax',
  'pl_bmassj': 'planetMassJupiter', 'pl_bmassjerr1': 'planetMassJupiterMin', 'pl_bmassjerr2': 'planetMassJupiterMax',
  'pl_dens': 'planetDensity', 'pl_denserr1': 'planetDensityMin', 'pl_denserr2': 'planetDensityMax',
  'koi_teq': 'equilibriumTemperature', 'pl_eqt': 'equilibriumTemperature',
  'koi_teq_err1': 'equilibriumTemperatureMin', 'koi_teq_err2': 'equilibriumTemperatureMax',
  'pl_eqterr1': 'equilibriumTemperatureMin', 'pl_eqterr2': 'equilibriumTemperatureMax',
  'koi_insol': 'insolationFlux', 'pl_insol': 'insolationFlux',
  'koi_insol_err1': 'insolationFluxMin', 'koi_insol_err2': 'insolationFluxMax',
  'pl_insolerr1': 'insolationFluxMin', 'pl_insolerr2': 'insolationFluxMax',

  // Stellar
  'koi_steff': 'stellarEffectiveTemperature', 'st_teff': 'stellarEffectiveTemperature',
  'koi_steff_err1': 'stellarEffectiveTemperatureMin', 'koi_steff_err2': 'stellarEffectiveTemperatureMax',
  'st_tefferr1': 'stellarEffectiveTemperatureMin', 'st_tefferr2': 'stellarEffectiveTemperatureMax',
  'koi_slogg': 'stellarSurfaceGravity', 'st_logg': 'stellarSurfaceGravity',
  'koi_slogg_err1': 'stellarSurfaceGravityMin', 'koi_slogg_err2': 'stellarSurfaceGravityMax',
  'st_loggerr1': 'stellarSurfaceGravityMin', 'st_loggerr2': 'stellarSurfaceGravityMax',
  'koi_srad': 'stellarRadius', 'st_rad': 'stellarRadius',
  'koi_srad_err1': 'stellarRadiusMin', 'koi_srad_err2': 'stellarRadiusMax',
  'st_raderr1': 'stellarRadiusMin', 'st_raderr2': 'stellarRadiusMax',
  'st_mass': 'stellarMass', 'st_masserr1': 'stellarMassMin', 'st_masserr2': 'stellarMassMax',
  'st_met': 'stellarMetallicity', 'st_meterr1': 'stellarMetallicityMin', 'st_meterr2': 'stellarMetallicityMax',
  'st_age': 'stellarAge', 'st_ageerr1': 'stellarAgeMin', 'st_ageerr2': 'stellarAgeMax',

  // Positional/Photometric
  'ra': 'rightAscension', 'dec': 'declination',
  'koi_kepmag': 'magnitude', 'sy_tmag': 'magnitude', 'k2_mag': 'magnitude',

  // Mission-specific
  'koi_score': 'dispositionScore', 'koi_model_snr': 'modelSnr', 'koi_tce_plnt_num': 'tcePlanetNumber',
  'tfopwg_disp': 'tfopwgDisposition'
};

// Function to calculate isExoplanet
function calculateIsExoplanet(row) {
  const dispositions = [row['koi_disposition'], row['disposition'], row['k2c_disp'], row['koi_pdisposition'], row['tfopwg_disp']];
  return dispositions.some(d => d && d.toUpperCase() === 'CONFIRMED') ? true : false;
}

// Main function to combine CSVs
async function combineCSVs() {
  const currentDir = process.cwd();
  const outputDir = path.join(currentDir, 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const outputPath = path.join(outputDir, 'result.csv');
  const csvWriter = createCsvWriter({
    path: outputPath,
    header: unifiedHeaders.map(header => ({ id: header, title: header }))
  });

  const allRows = [];

  // Read all files in current directory
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    if (path.extname(file).toLowerCase() === '.csv') {
      const filePath = path.join(currentDir, file);
      console.log(`Processing file: ${file}`);

      await new Promise((resolve, reject) => {
        const rows = [];
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on('data', (row) => {
            const unifiedRow = {};
            Object.keys(row).forEach(originalHeader => {
              const unifiedHeader = headerMappings[originalHeader];
              if (unifiedHeader) {
                unifiedRow[unifiedHeader] = row[originalHeader];
              }
            });
            unifiedRow.isExoplanet = calculateIsExoplanet(row);
            rows.push(unifiedRow);
          })
          .on('end', () => {
            allRows.push(...rows);
            resolve();
          })
          .on('error', reject);
      });
    }
  }

  // Write all combined rows to output CSV
  await csvWriter.writeRecords(allRows);
  console.log(`Combined CSV written to ${outputPath}`);
}

combineCSVs().catch(err => console.error('Error:', err));