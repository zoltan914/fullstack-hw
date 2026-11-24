import axios from "axios";
import type { ApiResponse, Sensor, SensorReading, SensorReadingDto } from "../interfaces/interfaces";

const api = axios.create({
  baseURL: '/',
});

// ─── INTERCEPTOR ──────────────────────────────────────────────────────────────

api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
    if (status === 401) {
      console.warn('No permission (401)');
    } else if (status == 404) {
      console.warn('The request/data can not be found');
    } else if (status == 400) {
      console.warn('Bad Request')
    } else if (status == 409) {
      console.warn('Conflict')
    }
    else if (status >= 500) {
      console.error('Szerverhiba:', status);
    }
    return Promise.reject(error);
  }
);


export const getAllSensors = (): ApiResponse<Sensor[]> => api.get('/sensors');
export const getAllReadingsBySensorId = (sensorId: string): ApiResponse<SensorReading[]> => api.get(`/sensor-readings/${sensorId}`) 
export const saveSensorReading = (data: SensorReadingDto): ApiResponse<SensorReading> => api.post('/sensor-readings', data)
