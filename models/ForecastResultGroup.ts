import { Forecast } from "./Forecast.js"
import { ForecastResult } from "./ForecastResult.js"

export interface ForecastResultGroup {
  name: string
  forecasts: ForecastResult[]
  combinedForecast?: Forecast
}
