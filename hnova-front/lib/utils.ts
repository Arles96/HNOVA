import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface IExoplanetData {
  _id?: string;
  projectId?: string;

  // returned by ai model
  isExoplanet?: boolean;
  percentage?: number;
  
  // user feedback
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
  
  timestamp?: string;
  createdAt?: string;
}

export const CSV_FIELD_CATEGORIES = [
  {
    category: "Identification",
    icon: "🆔",
    fields: [
      { field: "hostId", description: "Unique identifier for the host star" },
      { field: "hostName", description: "Name of the host star system" },
      { field: "k2Id", description: "K2 mission identifier (if applicable)" },
      { field: "kepoiName", description: "Kepler Object of Interest name" },
    ],
  },
  {
    category: "Orbital Properties",
    icon: "🌍",
    fields: [
      { field: "orbitalPeriod", description: "Orbital period in days" },
      { field: "orbitalPeriodMin", description: "Minimum orbital period (uncertainty lower bound)" },
      { field: "orbitalPeriodMax", description: "Maximum orbital period (uncertainty upper bound)" },
    ],
  },
  {
    category: "Transit Measurements",
    icon: "🌑",
    fields: [
      { field: "transitDuration", description: "Duration of transit in hours" },
      { field: "transitDurationMin", description: "Minimum transit duration" },
      { field: "transitDurationMax", description: "Maximum transit duration" },
      { field: "transitDepth", description: "Depth of transit (fractional decrease in brightness)" },
      { field: "transitDepthMin", description: "Minimum transit depth" },
      { field: "transitDepthMax", description: "Maximum transit depth" },
      { field: "impactParameter", description: "Impact parameter (0 = center crossing, 1 = edge)" },
      { field: "impactParameterMin", description: "Minimum impact parameter" },
      { field: "impactParameterMax", description: "Maximum impact parameter" },
    ],
  },
  {
    category: "Planet Size",
    icon: "📏",
    fields: [
      { field: "planetRadiusEarth", description: "Planet radius in Earth radii" },
      { field: "planetRadiusEarthMin", description: "Minimum planet radius in Earth radii" },
      { field: "planetRadiusEarthMax", description: "Maximum planet radius in Earth radii" },
      { field: "planetRadiusJupiter", description: "Planet radius in Jupiter radii" },
      { field: "planetRadiusJupiterMin", description: "Minimum planet radius in Jupiter radii" },
      { field: "planetRadiusJupiterMax", description: "Maximum planet radius in Jupiter radii" },
    ],
  },
  {
    category: "Planet Mass",
    icon: "⚖️",
    fields: [
      { field: "planetMassEarth", description: "Planet mass in Earth masses" },
      { field: "planetMassEarthMin", description: "Minimum planet mass in Earth masses" },
      { field: "planetMassEarthMax", description: "Maximum planet mass in Earth masses" },
      { field: "planetMassJupiter", description: "Planet mass in Jupiter masses" },
      { field: "planetMassJupiterMin", description: "Minimum planet mass in Jupiter masses" },
      { field: "planetMassJupiterMax", description: "Maximum planet mass in Jupiter masses" },
    ],
  },
  {
    category: "Planet Physical Properties",
    icon: "🪐",
    fields: [
      { field: "planetDensity", description: "Planet density in g/cm³" },
      { field: "planetDensityMin", description: "Minimum planet density" },
      { field: "planetDensityMax", description: "Maximum planet density" },
      { field: "equilibriumTemperature", description: "Equilibrium temperature in Kelvin" },
      { field: "equilibriumTemperatureMin", description: "Minimum equilibrium temperature" },
      { field: "equilibriumTemperatureMax", description: "Maximum equilibrium temperature" },
      { field: "insolationFlux", description: "Insolation flux in Earth flux units" },
      { field: "insolationFluxMin", description: "Minimum insolation flux" },
      { field: "insolationFluxMax", description: "Maximum insolation flux" },
    ],
  },
  {
    category: "Stellar Temperature",
    icon: "🌡️",
    fields: [
      { field: "stellarEffectiveTemperature", description: "Host star effective temperature in Kelvin" },
      { field: "stellarEffectiveTemperatureMin", description: "Minimum stellar temperature" },
      { field: "stellarEffectiveTemperatureMax", description: "Maximum stellar temperature" },
    ],
  },
  {
    category: "Stellar Surface Properties",
    icon: "⭐",
    fields: [
      { field: "stellarSurfaceGravity", description: "Stellar surface gravity (log g in cgs units)" },
      { field: "stellarSurfaceGravityMin", description: "Minimum stellar surface gravity" },
      { field: "stellarSurfaceGravityMax", description: "Maximum stellar surface gravity" },
    ],
  },
  {
    category: "Stellar Size",
    icon: "☀️",
    fields: [
      { field: "stellarRadius", description: "Stellar radius in solar radii" },
      { field: "stellarRadiusMin", description: "Minimum stellar radius" },
      { field: "stellarRadiusMax", description: "Maximum stellar radius" },
    ],
  },
  {
    category: "Stellar Mass",
    icon: "🌟",
    fields: [
      { field: "stellarMass", description: "Stellar mass in solar masses" },
      { field: "stellarMassMin", description: "Minimum stellar mass" },
      { field: "stellarMassMax", description: "Maximum stellar mass" },
    ],
  },
  {
    category: "Stellar Composition",
    icon: "🔬",
    fields: [
      { field: "stellarMetallicity", description: "Stellar metallicity [Fe/H] (dex)" },
      { field: "stellarMetallicityMin", description: "Minimum stellar metallicity" },
      { field: "stellarMetallicityMax", description: "Maximum stellar metallicity" },
    ],
  },
  {
    category: "Stellar Age",
    icon: "⏳",
    fields: [
      { field: "stellarAge", description: "Stellar age in billions of years" },
      { field: "stellarAgeMin", description: "Minimum stellar age" },
      { field: "stellarAgeMax", description: "Maximum stellar age" },
    ],
  },
  {
    category: "Coordinates & Metrics",
    icon: "📍",
    fields: [
      { field: "rightAscension", description: "Right ascension coordinate in degrees" },
      { field: "declination", description: "Declination coordinate in degrees" },
      { field: "magnitude", description: "Apparent magnitude (brightness)" },
      { field: "dispositionScore", description: "Disposition score (confidence metric)" },
      { field: "modelSnr", description: "Model signal-to-noise ratio" },
      { field: "tcePlanetNumber", description: "Threshold Crossing Event planet number" },
    ],
  },
]

export enum ExoplanetFieldEnum {
  hostId = "hostId",
  isExoplanet = "isExoplanet",
  hostName = "hostName",
  k2Id = "k2Id",
  kepoiName = "kepoiName",

  orbitalPeriod = "orbitalPeriod",
  orbitalPeriodMin = "orbitalPeriodMin",
  orbitalPeriodMax = "orbitalPeriodMax",

  transitDuration = "transitDuration",
  transitDurationMin = "transitDurationMin",
  transitDurationMax = "transitDurationMax",

  transitDepth = "transitDepth",
  transitDepthMin = "transitDepthMin",
  transitDepthMax = "transitDepthMax",

  impactParameter = "impactParameter",
  impactParameterMin = "impactParameterMin",
  impactParameterMax = "impactParameterMax",

  planetRadiusEarth = "planetRadiusEarth",
  planetRadiusEarthMin = "planetRadiusEarthMin",
  planetRadiusEarthMax = "planetRadiusEarthMax",

  planetRadiusJupiter = "planetRadiusJupiter",
  planetRadiusJupiterMin = "planetRadiusJupiterMin",
  planetRadiusJupiterMax = "planetRadiusJupiterMax",

  planetMassEarth = "planetMassEarth",
  planetMassEarthMin = "planetMassEarthMin",
  planetMassEarthMax = "planetMassEarthMax",

  planetMassJupiter = "planetMassJupiter",
  planetMassJupiterMin = "planetMassJupiterMin",
  planetMassJupiterMax = "planetMassJupiterMax",

  planetDensity = "planetDensity",
  planetDensityMin = "planetDensityMin",
  planetDensityMax = "planetDensityMax",

  equilibriumTemperature = "equilibriumTemperature",
  equilibriumTemperatureMin = "equilibriumTemperatureMin",
  equilibriumTemperatureMax = "equilibriumTemperatureMax",

  insolationFlux = "insolationFlux",
  insolationFluxMin = "insolationFluxMin",
  insolationFluxMax = "insolationFluxMax",

  stellarEffectiveTemperature = "stellarEffectiveTemperature",
  stellarEffectiveTemperatureMin = "stellarEffectiveTemperatureMin",
  stellarEffectiveTemperatureMax = "stellarEffectiveTemperatureMax",

  stellarSurfaceGravity = "stellarSurfaceGravity",
  stellarSurfaceGravityMin = "stellarSurfaceGravityMin",
  stellarSurfaceGravityMax = "stellarSurfaceGravityMax",

  stellarRadius = "stellarRadius",
  stellarRadiusMin = "stellarRadiusMin",
  stellarRadiusMax = "stellarRadiusMax",

  stellarMass = "stellarMass",
  stellarMassMin = "stellarMassMin",
  stellarMassMax = "stellarMassMax",

  stellarMetallicity = "stellarMetallicity",
  stellarMetallicityMin = "stellarMetallicityMin",
  stellarMetallicityMax = "stellarMetallicityMax",

  stellarAge = "stellarAge",
  stellarAgeMin = "stellarAgeMin",
  stellarAgeMax = "stellarAgeMax",

  rightAscension = "rightAscension",
  declination = "declination",
  magnitude = "magnitude",

  dispositionScore = "dispositionScore",
  modelSnr = "modelSnr",
  tcePlanetNumber = "tcePlanetNumber",

  createdAt = "createdAt"
}

export interface IProject {
  _id?: string;
  projectName: string
  email: string
  results: IExoplanetData[]
  timestamp?: string,
  createdAt?: string
}
