import { IExoplanetData } from "@/lib/utils";

export const modelPrediction = async (data: IExoplanetData[]) => {
  return new Promise<IExoplanetData[]>((resolve) => {
    setTimeout(() => {
      const result = data.map((item) => {
        const newData: IExoplanetData = {
          ...item,
          projectId: `${Math.random()}`,
          isExoplanet: Math.random() > 0.5,
          percentage: Math.random() * 100,
        };
        return newData;
      });
      resolve(result);
    }, 100);
  });
}