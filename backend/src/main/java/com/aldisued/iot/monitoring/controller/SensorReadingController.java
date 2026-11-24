package com.aldisued.iot.monitoring.controller;

import com.aldisued.iot.monitoring.dto.SensorReadingDto;
import com.aldisued.iot.monitoring.entity.SensorReading;
import com.aldisued.iot.monitoring.service.SensorReadingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/sensor-readings")
public class SensorReadingController {

  private final SensorReadingService sensorReadingService;

  public SensorReadingController(SensorReadingService sensorReadingService) {
    this.sensorReadingService = sensorReadingService;
  }

  // frontend requires a GET endpoint for all data
  @GetMapping
  public List<SensorReading> getAllSensorReadings() {
    return sensorReadingService.getAllSensorReadings();
  }

  @GetMapping("/{sensorId}")
  public List<SensorReading> getAllSensorReadingsBySensorId(@PathVariable UUID sensorId) {
    return sensorReadingService.getAllSensorReadingsBySensorId(sensorId);
  }

  @PostMapping
  public SensorReading saveSensorReading(@RequestBody SensorReadingDto sensorReadingDto) {
    return sensorReadingService.saveSensorReading(sensorReadingDto);
  }
}
