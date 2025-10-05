import mongoose, { Schema, Model } from 'mongoose';

interface ExoplanetData {
  projectId: string;
  
  isExoplanet?: boolean;
  percentage?: number;

  feedbackIsPlanet?: boolean;
  
  hostId?: string;
  hostName?: string;
  k2Id?: string;
  kepoiName?: string;

  orbitalPeriod?: number;
  orbitalPeriodMin?: number;
  orbitalPeriodMax?: number;

  transitDuration?: number;
  transitDurationMin?: number;
  transitDurationMax?: number;

  transitDepth?: number;
  transitDepthMin?: number;
  transitDepthMax?: number;

  impactParameter?: number;
  impactParameterMin?: number;
  impactParameterMax?: number;

  planetRadiusEarth?: number;
  planetRadiusEarthMin?: number;
  planetRadiusEarthMax?: number;

  planetRadiusJupiter?: number;
  planetRadiusJupiterMin?: number;
  planetRadiusJupiterMax?: number;

  planetMassEarth?: number;
  planetMassEarthMin?: number;
  planetMassEarthMax?: number;

  planetMassJupiter?: number;
  planetMassJupiterMin?: number;
  planetMassJupiterMax?: number;

  planetDensity?: number;
  planetDensityMin?: number;
  planetDensityMax?: number;

  equilibriumTemperature?: number;
  equilibriumTemperatureMin?: number;
  equilibriumTemperatureMax?: number;

  insolationFlux?: number;
  insolationFluxMin?: number;
  insolationFluxMax?: number;

  stellarEffectiveTemperature?: number;
  stellarEffectiveTemperatureMin?: number;
  stellarEffectiveTemperatureMax?: number;

  stellarSurfaceGravity?: number;
  stellarSurfaceGravityMin?: number;
  stellarSurfaceGravityMax?: number;

  stellarRadius?: number;
  stellarRadiusMin?: number;
  stellarRadiusMax?: number;

  stellarMass?: number;
  stellarMassMin?: number;
  stellarMassMax?: number;

  stellarMetallicity?: number;
  stellarMetallicityMin?: number;
  stellarMetallicityMax?: number;

  stellarAge?: number;
  stellarAgeMin?: number;
  stellarAgeMax?: number;

  rightAscension?: number;
  declination?: number;
  magnitude?: number;

  dispositionScore?: number;
  modelSnr?: number;
  tcePlanetNumber?: number;
}

const ExoplanetSchema = new Schema<ExoplanetData>({
  hostId: { type: String },
  isExoplanet: { type: Boolean },
  hostName: { type: String },
  k2Id: { type: String },
  kepoiName: { type: String },

  orbitalPeriod: { type: Number },
  orbitalPeriodMin: { type: Number },
  orbitalPeriodMax: { type: Number },

  transitDuration: { type: Number },
  transitDurationMin: { type: Number },
  transitDurationMax: { type: Number },

  transitDepth: { type: Number },
  transitDepthMin: { type: Number },
  transitDepthMax: { type: Number },

  impactParameter: { type: Number },
  impactParameterMin: { type: Number },
  impactParameterMax: { type: Number },

  planetRadiusEarth: { type: Number },
  planetRadiusEarthMin: { type: Number },
  planetRadiusEarthMax: { type: Number },

  planetRadiusJupiter: { type: Number },
  planetRadiusJupiterMin: { type: Number },
  planetRadiusJupiterMax: { type: Number },

  planetMassEarth: { type: Number },
  planetMassEarthMin: { type: Number },
  planetMassEarthMax: { type: Number },

  planetMassJupiter: { type: Number },
  planetMassJupiterMin: { type: Number },
  planetMassJupiterMax: { type: Number },

  planetDensity: { type: Number },
  planetDensityMin: { type: Number },
  planetDensityMax: { type: Number },

  equilibriumTemperature: { type: Number },
  equilibriumTemperatureMin: { type: Number },
  equilibriumTemperatureMax: { type: Number },

  insolationFlux: { type: Number },
  insolationFluxMin: { type: Number },
  insolationFluxMax: { type: Number },

  stellarEffectiveTemperature: { type: Number },
  stellarEffectiveTemperatureMin: { type: Number },
  stellarEffectiveTemperatureMax: { type: Number },

  stellarSurfaceGravity: { type: Number },
  stellarSurfaceGravityMin: { type: Number },
  stellarSurfaceGravityMax: { type: Number },

  stellarRadius: { type: Number },
  stellarRadiusMin: { type: Number },
  stellarRadiusMax: { type: Number },

  stellarMass: { type: Number },
  stellarMassMin: { type: Number },
  stellarMassMax: { type: Number },

  stellarMetallicity: { type: Number },
  stellarMetallicityMin: { type: Number },
  stellarMetallicityMax: { type: Number },

  stellarAge: { type: Number },
  stellarAgeMin: { type: Number },
  stellarAgeMax: { type: Number },

  rightAscension: { type: Number },
  declination: { type: Number },
  magnitude: { type: Number },

  dispositionScore: { type: Number },
  modelSnr: { type: Number },
  tcePlanetNumber: { type: Number },
}, { 
  collection: 'exoplanets',
  timestamps: true 
});

// Prevent model recompilation in Next.js hot reload
const Exoplanet: Model<ExoplanetData> = mongoose.models.Exoplanet || mongoose.model<ExoplanetData>('Exoplanet', ExoplanetSchema);

export default Exoplanet;
export type { ExoplanetData };