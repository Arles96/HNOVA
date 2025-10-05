import mongoose, { Schema, Model } from 'mongoose';

interface ExoplanetData {
  // Unified ID/Name fields
  hostId?: string;
  isExoplanet?: boolean;
  planetName?: string;
  hostName?: string;

  // Unified orbital parameters
  orbitalPeriod?: number;
  orbitalPeriodMin?: number;
  orbitalPeriodMax?: number;
  orbitSemiMajorAxis?: number;
  orbitSemiMajorAxisMin?: number;
  orbitSemiMajorAxisMax?: number;
  eccentricity?: number;
  eccentricityMin?: number;
  eccentricityMax?: number;
  inclination?: number;
  inclinationMin?: number;
  inclinationMax?: number;

  // Unified transit parameters
  transitDuration?: number;
  transitDurationMin?: number;
  transitDurationMax?: number;
  transitDepth?: number;
  transitDepthMin?: number;
  transitDepthMax?: number;
  impactParameter?: number;
  impactParameterMin?: number;
  impactParameterMax?: number;

  // Unified planet physical parameters
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

  // Unified stellar parameters
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

  // Unified positional and photometric
  rightAscension?: number;
  declination?: number;
  magnitude?: number;
}

const ExoplanetSchema = new Schema<ExoplanetData>({
  // Unified ID/Name fields
  hostId: { type: String },
  isExoplanet: { type: Boolean },
  planetName: { type: String },
  hostName: { type: String },

  // Unified orbital parameters
  orbitalPeriod: { type: Number },
  orbitalPeriodMin: { type: Number },
  orbitalPeriodMax: { type: Number },
  orbitSemiMajorAxis: { type: Number },
  orbitSemiMajorAxisMin: { type: Number },
  orbitSemiMajorAxisMax: { type: Number },
  eccentricity: { type: Number },
  eccentricityMin: { type: Number },
  eccentricityMax: { type: Number },
  inclination: { type: Number },
  inclinationMin: { type: Number },
  inclinationMax: { type: Number },

  // Unified transit parameters
  transitDuration: { type: Number },
  transitDurationMin: { type: Number },
  transitDurationMax: { type: Number },
  transitDepth: { type: Number },
  transitDepthMin: { type: Number },
  transitDepthMax: { type: Number },
  impactParameter: { type: Number },
  impactParameterMin: { type: Number },
  impactParameterMax: { type: Number },

  // Unified planet physical parameters
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

  // Unified stellar parameters
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

  // Unified positional and photometric
  rightAscension: { type: Number },
  declination: { type: Number },
  magnitude: { type: Number },
}, { 
  collection: 'exoplanets',
  timestamps: true 
});

// Prevent model recompilation in Next.js hot reload
const Exoplanet: Model<ExoplanetData> = mongoose.models.Exoplanet || mongoose.model<ExoplanetData>('Exoplanet', ExoplanetSchema);

export default Exoplanet;
export type { ExoplanetData };
