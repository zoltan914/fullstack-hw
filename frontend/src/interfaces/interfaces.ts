import type { AxiosResponse } from 'axios';

export type Alert = {
  id: number
  message: string
  timestamp: Date
}

export type SensorReading = {
  id: number
  value: number
  timestamp: Date
}

export type Sensor = {
  id: number
  name: string
  type: string
  alerts: Alert[] | []
  seonsorReadings: SensorReading[] | []
}



// ─── API RESPONSE HELPER ──────────────────────────────────────────────────
export type ApiResponse<T> = Promise<AxiosResponse<T>>