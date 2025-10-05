# Google Cloud AI Platform Setup Guide

## Prerequisites
1. **Google Cloud Project**: You need a Google Cloud project with Vertex AI enabled
2. **Trained Model**: A trained model deployed to a Vertex AI endpoint
3. **Authentication**: Proper authentication credentials

## Environment Variables Setup

Set the following environment variables in your `.env.local` file:

```bash
# Required: Your Google Cloud project ID
GOOGLE_CLOUD_PROJECT_ID=your-project-id

# Required: Your Vertex AI endpoint ID
GOOGLE_CLOUD_ENDPOINT_ID=your-endpoint-id

# Optional: Google Cloud region (defaults to us-central1)
GOOGLE_CLOUD_LOCATION=us-central1
```

## Authentication Setup

### Option 1: Application Default Credentials (Recommended)

1. **Install Google Cloud CLI**:
   ```bash
   # For Linux
   curl https://sdk.cloud.google.com | bash
   exec -l $SHELL
   ```

2. **Authenticate**:
   ```bash
   gcloud auth application-default login
   ```

3. **Set the project**:
   ```bash
   gcloud config set project your-project-id
   ```

### Option 2: Service Account Key (Alternative)

1. **Create a service account** in Google Cloud Console
2. **Download the JSON key file**
3. **Set the environment variable**:
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="path/to/your/service-account-key.json"
   ```

## Finding Your Endpoint ID

1. Go to [Vertex AI Endpoints](https://console.cloud.google.com/vertex-ai/endpoints) in Google Cloud Console
2. Find your deployed model endpoint
3. Copy the **Endpoint ID** (not the full resource name)

## Common Issues and Solutions

### Authentication Errors
- Ensure you've run `gcloud auth application-default login`
- Check that `GOOGLE_CLOUD_PROJECT_ID` is set correctly
- Verify the service account has Vertex AI permissions

### Endpoint Errors
- Confirm the endpoint ID is correct
- Ensure the endpoint is deployed and active
- Check that the model is compatible with the prediction format

### Instance Format Errors
- The code automatically formats exoplanet data for prediction
- Ensure your data includes numeric fields that match your model's training schema
- Check the model input requirements in Vertex AI console

## Testing the Setup

You can test if line 24 works by:

1. Setting up proper authentication
2. Ensuring environment variables are set
3. Calling the `modelPrediction` function with sample exoplanet data

The function will now:
- Validate environment variables
- Format instances properly for Google Cloud AI Platform
- Provide detailed error messages for debugging
- Use Application Default Credentials for secure authentication
