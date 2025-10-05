interface ExoplanetTrainData {
  // Unified ID/Name fields (e.g., kepid = epic_id = tic_id → hostId; kepler_name = pl_name → planetName)
  hostId?: string;  // Unified host star ID (e.g., kepid, epic_id, tic_id)
  isExoplanet?: boolean;  // Boolean: true if confirmed exoplanet (derived from dispositions like koi_disposition, disposition, k2c_disp)
  planetName?: string;  // Unified planet name (e.g., kepler_name, pl_name)
  hostName?: string;  // Unified host star name (e.g., hostname)
  // planetLetter?: string;  // Planet letter in system (e.g., from TESS/K2)
  // k2Id?: string;  // K2-specific ID (unique to K2)
  // toi?: string;  // TESS Object of Interest (unique to TESS)
  // tid?: string;  // TESS ID (unique to TESS)
  // kepoiName?: string;  // Kepler Object of Interest name (unique to Kepler)

  // Unified orbital parameters (e.g., koi_period = pl_orbper → orbitalPeriod)
  orbitalPeriod?: number;  // Orbital period in days
  orbitalPeriodMin?: number;  // Lower error/uncertainty
  orbitalPeriodMax?: number;  // Upper error/uncertainty
  orbitSemiMajorAxis?: number;  // Semi-major axis in AU (from TESS/K2, no direct Kepler equiv but derivable)
  orbitSemiMajorAxisMin?: number;
  orbitSemiMajorAxisMax?: number;
  eccentricity?: number;  // Orbital eccentricity (from TESS/K2, derivable in Kepler)
  eccentricityMin?: number;
  eccentricityMax?: number;
  inclination?: number;  // Orbital inclination in degrees (from TESS/K2)
  inclinationMin?: number;
  inclinationMax?: number;

  // Unified transit parameters (e.g., koi_duration = pl_trandur → transitDuration)
  transitDuration?: number;  // Transit duration in hours
  transitDurationMin?: number;
  transitDurationMax?: number;
  transitDepth?: number;  // Transit depth in ppm (e.g., koi_depth = pl_trandep)
  transitDepthMin?: number;
  transitDepthMax?: number;
  impactParameter?: number;  // Impact parameter (e.g., koi_impact)
  impactParameterMin?: number;
  impactParameterMax?: number;

  // Unified planet physical parameters (e.g., koi_prad = pl_rade → planetRadiusEarth)
  planetRadiusEarth?: number;  // Planet radius in Earth radii
  planetRadiusEarthMin?: number;
  planetRadiusEarthMax?: number;
  planetRadiusJupiter?: number;  // Planet radius in Jupiter radii (unique to K2's pl_radj)
  planetRadiusJupiterMin?: number;
  planetRadiusJupiterMax?: number;
  planetMassEarth?: number;  // Planet mass in Earth masses (e.g., pl_bmasse)
  planetMassEarthMin?: number;
  planetMassEarthMax?: number;
  planetMassJupiter?: number;  // Planet mass in Jupiter masses (e.g., pl_bmassj)
  planetMassJupiterMin?: number;
  planetMassJupiterMax?: number;
  planetDensity?: number;  // Planet density in g/cm³ (e.g., pl_dens)
  planetDensityMin?: number;
  planetDensityMax?: number;
  equilibriumTemperature?: number;  // Equilibrium temperature in K (e.g., koi_teq = pl_eqt)
  equilibriumTemperatureMin?: number;
  equilibriumTemperatureMax?: number;
  insolationFlux?: number;  // Insolation flux relative to Earth (e.g., koi_insol = pl_insol)
  insolationFluxMin?: number;
  insolationFluxMax?: number;

  // Unified stellar parameters (e.g., koi_steff = st_teff → stellarEffectiveTemperature)
  stellarEffectiveTemperature?: number;  // Stellar effective temperature in K
  stellarEffectiveTemperatureMin?: number;
  stellarEffectiveTemperatureMax?: number;
  stellarSurfaceGravity?: number;  // Stellar log(g) (e.g., koi_slogg = st_logg)
  stellarSurfaceGravityMin?: number;
  stellarSurfaceGravityMax?: number;
  stellarRadius?: number;  // Stellar radius in solar radii (e.g., koi_srad = st_rad)
  stellarRadiusMin?: number;
  stellarRadiusMax?: number;
  stellarMass?: number;  // Stellar mass in solar masses (from TESS/K2)
  stellarMassMin?: number;
  stellarMassMax?: number;
  stellarMetallicity?: number;  // Stellar metallicity [Fe/H] (unique to K2's st_met)
  stellarMetallicityMin?: number;
  stellarMetallicityMax?: number;
  stellarAge?: number;  // Stellar age in Gyr (unique to K2's st_age)
  stellarAgeMin?: number;
  stellarAgeMax?: number;

  // Unified positional and photometric (e.g., ra/dec common; magnitudes: koi_kepmag = sy_tmag = k2_mag → magnitude)
  rightAscension?: number;  // RA in degrees
  declination?: number;  // Dec in degrees
  magnitude?: number;  // Photometric magnitude (unified across missions)

  // // Mission-specific uniques (not unified, as no equivalents)
  // dispositionScore?: number;  // Disposition score (unique to Kepler's koi_score)
  // modelSnr?: number;  // Model SNR (unique to Kepler's koi_model_snr)
  // tcePlanetNumber?: number;  // TCE planet number (unique to Kepler's koi_tce_plnt_num)
  // tfopwgDisposition?: string;  // TFOPWG disposition (unique to TESS's tfopwg_disp)
}