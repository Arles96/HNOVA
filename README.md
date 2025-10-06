# HNOVA Project

HNOVA is a comprehensive platform for classifying exoplanets using a machine learning model trained on astronomical data. The project is designed to determine the likelihood of a celestial body being an exoplanet based on various physical and orbital parameters.

**Live Application**: [https://hnova-delta.vercel.app/](https://hnova-delta.vercel.app/)

This repository is a monorepo containing three distinct but interconnected components:

### Project Structure

-   **/hnova-front**: The main web application built with Next.js. It provides the user interface for uploading data, viewing classification results, and managing projects. It interacts with a MongoDB database and the Vertex AI model endpoint.

-   **/data-cleanup**: A set of Node.js scripts used for sanitizing, unifying, and preparing the raw exoplanet data sourced from various astronomical catalogs. This process is a crucial prerequisite for training the model and ensuring data quality for predictions.

-   **/AI**: Contains the exported TensorFlow AutoML model from Google Cloud's Vertex AI. This model is trained on tabular data to perform classification tasks, identifying whether a candidate is an exoplanet.

### Core Technologies

-   **Frontend**: Next.js, React, TypeScript, Tailwind CSS
-   **Backend**: Next.js API Routes, Node.js
-   **Database**: MongoDB
-   **Machine Learning**: Google Cloud Vertex AI (AutoML for Tabular Classification)
-   **Data Processing**: Google BigQuery, Node.js
-   **Deployment**: Vercel, Google Cloud Platform (GCP)
