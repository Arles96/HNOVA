import { IExoplanetData } from '@/lib/utils';
import { PredictionServiceClient } from '@google-cloud/aiplatform';

// TODO: Replace with your actual values
const project = process.env.GOOGLE_CLOUD_PROJECT_ID || 'your-project-id';
const location = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1'; // e.g., 'us-central1'
const endpointId = process.env.GOOGLE_CLOUD_ENDPOINT_ID || 'your-endpoint-id';
const apiKey = process.env.GOOGLE_CLOUD_API_KEY || 'your-api-key'; // NOT recommended for security reasons

export const modelPrediction = async (instances: IExoplanetData[]) => {
  
  // Initialize the client with API key (alternative, but insecure)
  const client = new PredictionServiceClient({
    apiKey: apiKey, // This is not standard for SDK; better to use ADC
  });

  // Construct the endpoint path
  const endpoint = `projects/${project}/locations/${location}/endpoints/${endpointId}`;

  try {
    // Convert IExoplanetData to IValue format
    const formattedInstances = instances.map((data: IExoplanetData) => ({
      structValue: {
        fields: Object.entries(data).reduce((acc, [key, value]) => {
          if (typeof value === 'number') {
            acc[key] = { numberValue: value };
          } else if (typeof value === 'string') {
            acc[key] = { stringValue: value };
          } else if (typeof value === 'boolean') {
            acc[key] = { boolValue: value };
          } else if (value === null) {
            acc[key] = { nullValue: 0 };
          }
          return acc;
        }, {} as Record<string, any>)
      }
    }));

    // Make the prediction
    const response = await client.predict({ endpoint, instances: formattedInstances });
    const predictions = response?.[0]?.predictions?.map((prediction, index) => {
      const percentage0 = (prediction?.structValue?.fields?.scores?.listValue?.values?.[0]?.numberValue || 0) * 100;
      const percentage1 = (prediction?.structValue?.fields?.scores?.listValue?.values?.[1]?.numberValue || 0) * 100;
      const percentage = percentage0 > percentage1 ? percentage0 : percentage1;
      return {
        ...instances[index],
        percentage,
        isExoplanet: percentage1 > 90,
        projectId: instances[index].projectId,
      };
    });
    return predictions;
  } catch (error) {
    console.error('Error making prediction:', error);
    return [];
  }
}
