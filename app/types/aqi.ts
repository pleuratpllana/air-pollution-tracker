export interface ForecastDay {
  day: string;
  avg: number;
}

export interface AQIForecast {
  pm25?: ForecastDay[];
  pm10?: ForecastDay[];
}

export interface AQIData {
  aqi: number;
  dominant: string;
  forecast?: AQIForecast;
  updated?: string;
}
