# Data Cleanup

This directory contains the scripts and resources used to clean, process, and unify the exoplanet data used for training the machine learning model.

## Overview

The data cleanup process is a critical step to ensure the quality and consistency of the dataset. The raw data is sourced from multiple astronomical catalogs, and these scripts are used to:
- Standardize column names and data formats.
- Handle missing or invalid values.
- Unify data from different sources into a single, coherent dataset.
- Generate a cleaned CSV file ready for use in Google BigQuery and for training the Vertex AI model.

## Scripts

- `unifier.js`: This script reads data from multiple CSV files (`cumulative_*.csv`, `k2pandc_*.csv`, `TOI_*.csv`), merges them, and generates a unified `result.csv`.
- `data-cleaner.js`: This script takes the unified `result.csv`, performs data cleaning and sanitization, and outputs the final `cleaned_result.csv`.

## Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Language**: [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- **Libraries**:
  - `csv-parser`: For reading and parsing CSV files.
  - `fast-csv`: For writing CSV files.

## Usage

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1.  Navigate to the `data-cleanup` directory:
    ```bash
    cd data-cleanup
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Scripts

1.  **Unify Data**:
    Run the `unifier.js` script to merge the source CSV files:
    ```bash
    node unifier.js
    ```
    This will create an `output/result.csv` file.

2.  **Clean Data**:
    Run the `data-cleaner.js` script to clean the unified data:
    ```bash
    node data-cleaner.js
    ```
    This will create the final `output/cleaned_result.csv` file, which can then be uploaded to Google BigQuery for model training.
