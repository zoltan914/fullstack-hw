import type { AxiosResponse } from 'axios';

export type Alert = {
  id: number
  message: string
  timestamp: Date
  sensorId: string
}

export type SensorReading = {
  id: number
  value: number
  timestamp: Date
}

export type Sensor = {
  id: string
  name: string
  type: string
  alerts: Alert[] | []
  seonsorReadings: SensorReading[] | []
}

// ─── REQUEST DTO-K (frontend → backend) ───────────────────────────────────────

export type SensorReadingDto = {
  sensorId: string,
  value: number,
  timestamp: string
}


// ─── API RESPONSE HELPER ──────────────────────────────────────────────────
export type ApiResponse<T> = Promise<AxiosResponse<T>>