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

- `model/`: This directory contains the exported TensorFlow model and its associated metadata.
  - `predict/`: The core TensorFlow SavedModel directory.
    - `saved_model.pb`: The main model file containing the graph definition.
    - `variables/`: Directory containing the learned weights of the model.
    - `assets/`: Directory containing vocabulary files for categorical features.
  - `environment.json`: Metadata about the training environment.
  - `feature_attributions.yaml`: Information on feature importance.
  - `instance.yaml`: A sample input instance for prediction.
  - `prediction_schema.yaml`: The schema for prediction input and output.
  - `*.pb`: Other protocol buffer files containing model structure and transformations.
- `bigQuery/`:
  - `data.csv`: The original dataset used for training.
  - `dataBalanced.csv`: A balanced version of the dataset to handle class imbalance.

## Usage

The primary way this model is consumed is through a REST API endpoint deployed on **Google Cloud Vertex AI**. The `hnova-front` application sends prediction requests to this endpoint to get classifications.

The model files included in this directory (`/model`) represent the exported TensorFlow SavedModel. While they can be used for local testing, inspection, or redeployment, the live application relies on the deployed Vertex AI endpoint for scalability and performance.

The logic for making requests to the Vertex AI API from the frontend application can be found in `hnova-front/app/api/modelPrediction.ts`.

