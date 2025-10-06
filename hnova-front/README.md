# HNOVA Frontend

This is the main application of the HNOVA project, a web platform for classifying celestial bodies and identifying potential exoplanets.

## Overview

The frontend is built with Next.js and provides a user-friendly interface for interacting with the exoplanet classification model. Users can:
- Upload CSV files with astronomical data.
- Input data manually through a form.
- View classification results in a clear and organized manner.
- Manage and track different classification projects.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) for object data modeling.
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- A MongoDB database instance (local or cloud-hosted)

### Installation

1.  Navigate to the `hnova-front` directory:
    ```bash
    cd hnova-front
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

3.  Set up your environment variables by creating a `.env.local` file from the `environment.example`:
    ```bash
    cp environment.example .env.local
    ```
    Update the `.env.local` file with your MongoDB connection string and other required credentials.

### Running the Development Server

To start the development server, run:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Key Features

- **CSV Upload**: Users can upload CSV files containing data of potential exoplanet candidates. The data is then sent to the backend for prediction.
- **Manual Input**: A form is available for users to manually input the parameters of a celestial body for classification.
- **Results Visualization**: The classification results are displayed in a user-friendly format, indicating whether a candidate is likely to be an exoplanet.
- **Project Management**: Users can create and manage projects to keep track of their classification tasks.
