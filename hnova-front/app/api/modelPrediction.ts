import { IExoplanetData } from '@/lib/utils';
import { PredictionServiceClient } from '@google-cloud/aiplatform';

// TODO: Replace with your actual values
const project = process.env.GOOGLE_CLOUD_PROJECT_ID || 'your-project-id';
const location = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1'; // e.g., 'us-central1'
const endpointId = process.env.GOOGLE_CLOUD_ENDPOINT_ID || 'your-endpoint-id';
const apiKey = process.env.GOOGLE_CLOUD_API_KEY || 'your-api-key'; // NOT recommended for security reasons

export const modelPrediction = async (instances: IExoplanetData[]) => {
  console.log(project, location, endpointId, apiKey);
  // Initialize the client with API key (alternative, but insecure)
  const client = new PredictionServiceClient({
    apiKey: apiKey, // This is not standard for SDK; better to use ADC
  });

  // Construct the endpoint path
  const endpoint = `projects/${project}/locations/${location}/endpoints/${endpointId}`;

  console.log(JSON.stringify(instances, null, 2));

  try {
    // Make the prediction
    const response = await client.predict({endpoint, instances });
    console.log(JSON.stringify(response, null, 2));
    return [];
  } catch (error) {
    console.error('Error making prediction:', error);
    return [];
  }
}


// export const modelPrediction = async (data: IExoplanetData[]) => {
//   return new Promise<IExoplanetData[]>((resolve) => {
//     setTimeout(() => {
//       const result = data.map((item) => {
//         const newData: IExoplanetData = {
//           ...item,
//           projectId: `${Math.random()}`,
//           isExoplanet: Math.random() > 0.5,
//           percentage: Math.random() * 100,
//         };
//         return newData;
//       });
//       resolve(result);
//     }, 100);
//   });
// }
