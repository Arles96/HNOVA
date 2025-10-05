import { ExoplanetFieldEnum, IExoplanetData } from "./utils";

export const resultsCsv = (lines: string[], headers: string[]): IExoplanetData[] => {
  const previewData = lines.slice(1, 6).map((line) => {
    const values = line.split(",")
    return headers.reduce(
      (obj: IExoplanetData, header, index) => {
        const name = header.trim()
        if (ExoplanetFieldEnum.hostId === name) {
          obj.hostId = values[index]?.trim() || undefined
        } else if (ExoplanetFieldEnum.isExoplanet === name) {
          obj.isExoplanet = values[index]?.trim() ? values[index]?.trim().toLowerCase() === "true" : undefined
        } else if (ExoplanetFieldEnum.hostName === name) {
          obj.hostName = values[index]?.trim() || undefined
        } else if (ExoplanetFieldEnum.k2Id === name) {
          obj.k2Id = values[index]?.trim() || undefined
        } else if (ExoplanetFieldEnum.kepoiName === name) {
          obj.kepoiName = values[index]?.trim() || undefined
        } else if (ExoplanetFieldEnum.orbitalPeriod === name) {
          obj.orbitalPeriod = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.orbitalPeriodMin === name) {
          obj.orbitalPeriodMin = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.orbitalPeriodMax === name) {
          obj.orbitalPeriodMax = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.transitDuration === name) {
          obj.transitDuration = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.transitDurationMin === name) {
          obj.transitDurationMin = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.transitDurationMax === name) {
          obj.transitDurationMax = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.transitDepth === name) {
          obj.transitDepth = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.transitDepthMin === name) {
          obj.transitDepthMin = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.transitDepthMax === name) {
          obj.transitDepthMax = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.impactParameter === name) {
          obj.impactParameter = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.impactParameterMin === name) {
          obj.impactParameterMin = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.impactParameterMax === name) {
          obj.impactParameterMax = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.planetRadiusEarth === name) {
          obj.planetRadiusEarth = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.planetRadiusEarthMin === name) {
          obj.planetRadiusEarthMin = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.planetRadiusEarthMax === name) {
          obj.planetRadiusEarthMax = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.planetRadiusJupiter === name) {
          obj.planetRadiusJupiter = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.planetRadiusJupiterMin === name) {
          obj.planetRadiusJupiterMin = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.planetRadiusJupiterMax === name) {
          obj.planetRadiusJupiterMax = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.planetMassEarth === name) {
          obj.planetMassEarth = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.planetMassEarthMin === name) {
          obj.planetMassEarthMin = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.planetMassEarthMax === name) {
          obj.planetMassEarthMax = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.planetMassJupiter === name) {
          obj.planetMassJupiter = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.planetMassJupiterMin === name) {
          obj.planetMassJupiterMin = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.planetMassJupiterMax === name) {
          obj.planetMassJupiterMax = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.planetDensity === name) {
          obj.planetDensity = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.planetDensityMin === name) {
          obj.planetDensityMin = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.planetDensityMax === name) {
          obj.planetDensityMax = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.equilibriumTemperature === name) {
          obj.equilibriumTemperature = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.equilibriumTemperatureMin === name) {
          obj.equilibriumTemperatureMin = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.equilibriumTemperatureMax === name) {
          obj.equilibriumTemperatureMax = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.insolationFlux === name) {
          obj.insolationFlux = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.insolationFluxMin === name) {
          obj.insolationFluxMin = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.insolationFluxMax === name) {
          obj.insolationFluxMax = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.stellarEffectiveTemperature === name) {
          obj.stellarEffectiveTemperature = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.stellarEffectiveTemperatureMin === name) {
          obj.stellarEffectiveTemperatureMin = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.stellarEffectiveTemperatureMax === name) {
          obj.stellarEffectiveTemperatureMax = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.stellarSurfaceGravity === name) {
          obj.stellarSurfaceGravity = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.stellarSurfaceGravityMin === name) {
          obj.stellarSurfaceGravityMin = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.stellarSurfaceGravityMax === name) {
          obj.stellarSurfaceGravityMax = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.stellarRadius === name) {
          obj.stellarRadius = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.stellarRadiusMin === name) {
          obj.stellarRadiusMin = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.stellarRadiusMax === name) {
          obj.stellarRadiusMax = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.stellarMass === name) {
          obj.stellarMass = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.stellarMassMin === name) {
          obj.stellarMassMin = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.stellarMassMax === name) {
          obj.stellarMassMax = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.stellarMetallicity === name) {
          obj.stellarMetallicity = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.stellarMetallicityMin === name) {
          obj.stellarMetallicityMin = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.stellarMetallicityMax === name) {
          obj.stellarMetallicityMax = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.stellarAge === name) {
          obj.stellarAge = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.stellarAgeMin === name) {
          obj.stellarAgeMin = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.stellarAgeMax === name) {
          obj.stellarAgeMax = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.rightAscension === name) {
          obj.rightAscension = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.declination === name) {
          obj.declination = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.magnitude === name) {
          obj.magnitude = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.dispositionScore === name) {
          obj.dispositionScore = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.modelSnr === name) {
          obj.modelSnr = values[index]?.trim() ? parseFloat(values[index]?.trim()) : undefined
        } else if (ExoplanetFieldEnum.tcePlanetNumber === name) {
          obj.tcePlanetNumber = values[index]?.trim() ? parseInt(values[index]?.trim(), 10) : undefined
        }
        return obj
      },
      {} as IExoplanetData,
    )
  })
  return previewData
}