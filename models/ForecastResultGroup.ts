import { Forecast } from "./Forecast"
import { ForecastResult } from "./ForecastResult"

export interface ForecastResultGroup {
  name: string
  forecasts: ForecastResult[]
  combinedForecast?: Forecast
}
