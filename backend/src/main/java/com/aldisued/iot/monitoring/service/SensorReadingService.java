package com.aldisued.iot.monitoring.service;

import com.aldisued.iot.monitoring.dto.SensorReadingDto;
import com.aldisued.iot.monitoring.entity.Sensor;
import com.aldisued.iot.monitoring.entity.SensorReading;
import com.aldisued.iot.monitoring.repository.SensorReadingRepository;
import com.aldisued.iot.monitoring.repository.SensorRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SensorReadingService {

  private final SensorReadingRepository sensorReadingRepository;
  private final SensorRepository sensorRepository;

  public SensorReadingService(SensorReadingRepository sensorReadingRepository,
      SensorRepository sensorRepository) {
    this.sensorReadingRepository = sensorReadingRepository;
    this.sensorRepository = sensorRepository;
  }

  public SensorReading saveSensorReading(SensorReadingDto sensorReadingDto) {
    //TODO: Task 3

    Sensor sensor = sensorRepository.findById(sensorReadingDto.sensorId())
            .orElseThrow(() -> new RuntimeException("Sensor with id: " + sensorReadingDto.sensorId() + " not found"));

    SensorReading sensorReading = new SensorReading();
    sensorReading.setValue(sensorReadingDto.value());
    sensorReading.setSensor(sensor);
    sensorReading.setTimestamp(sensorReadingDto.timestamp());
    return sensorReadingRepository.save(sensorReading);
  }

}
