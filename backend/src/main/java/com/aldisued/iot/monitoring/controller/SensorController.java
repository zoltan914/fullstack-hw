package com.aldisued.iot.monitoring.controller;

import com.aldisued.iot.monitoring.dto.SensorDto;
import com.aldisued.iot.monitoring.entity.Sensor;
import com.aldisued.iot.monitoring.service.SensorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sensors")
public class SensorController {

  private final SensorService sensorService;

  public SensorController(SensorService sensorService) {
    this.sensorService = sensorService;
  }

  // frontend requires a GET endpoint for all data
  @GetMapping
  public List<Sensor> getAllSensors() {
    return sensorService.getAllSensors();
  }

  @PostMapping
  public Sensor saveSensor(@RequestBody SensorDto sensorDto) {
    return sensorService.saveSensor(sensorDto);
  }
}