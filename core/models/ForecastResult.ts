import { Account } from "./Account.js"
import { Forecast } from "./Forecast.js"

export interface ForecastResult {
  account: Account
  forecast: Forecast
}
