# AI - Machine Learning Model

This directory contains the machine learning model used for exoplanet classification in the HNOVA project.

## Overview

The model is a classification model created using Google Cloud's **Vertex AI AutoML** for tabular data. It has been trained to predict whether a celestial body is an exoplanet (`isExoplanet` column) based on a set of features from the cleaned dataset.

The model was exported from Vertex AI and is included in this directory in the TensorFlow SavedModel format.

## Model Details

- **Platform**: [Google Cloud Vertex AI](https://cloud.google.com/vertex-ai)
- **Model Type**: AutoML for Tabular Data (Classification)
- **Target Column**: `isExoplanet`
- **Input Features**: Various astronomical parameters (e.g., orbital period, stellar radius, transit duration).
- **Format**: TensorFlow SavedModel

## Files

- `model/`: This directory contains the exported TensorFlow model.
  - `saved_model.pb`: The main model file containing the graph definition.
  - `variables/`: Directory containing the learned weights of the model.
  - `assets/`: Directory containing vocabulary files used by the model for categorical features.
- `bigQuery/`:
  - `data.csv`: The original dataset used for training.
  - `dataBalanced.csv`: A balanced version of the dataset to handle class imbalance.

## Usage

The model is loaded and used in the `hnova-front` application to make predictions. The Next.js backend has an API endpoint that receives data, preprocesses it to match the model's expected input format, and then calls the model to get a classification prediction.

For details on how the model is used in the application, refer to the `hnova-front/app/api/modelPrediction.ts` file.
