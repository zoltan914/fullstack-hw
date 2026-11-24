package com.aldisued.iot.monitoring.service;

import com.aldisued.iot.monitoring.dto.SensorDto;
import com.aldisued.iot.monitoring.entity.Sensor;
import com.aldisued.iot.monitoring.repository.SensorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class SensorService {

  private final SensorRepository sensorRepository;

  public SensorService(SensorRepository sensorRepository) {
    this.sensorRepository = sensorRepository;
  }

  public List<Sensor> getAllSensors() {
    return sensorRepository.findAll();
  }

  public Sensor saveSensor(SensorDto sensor) {

    if (sensor.name() == null || sensor.name().trim().isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sensor name must be provided.");
    }

    if (sensorRepository.existsByName(sensor.name())) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Sensor name already exists.");
    }

    return sensorRepository.save(new Sensor(
        sensor.name(),
        sensor.type()
    ));
  }
}
