package com.aldisued.iot.monitoring.controller;

import com.aldisued.iot.monitoring.dto.AlertDto;
import com.aldisued.iot.monitoring.entity.Alert;
import com.aldisued.iot.monitoring.service.AlertService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/alerts")
public class AlertController {

  private final AlertService alertService;

  public AlertController(AlertService alertService) {
    this.alertService = alertService;
  }

  // frontend requires a GET endpoint for all data
  @GetMapping
  public List<Alert>  getAllAlerts() {
    return alertService.getAllAlerts();
  }

  @GetMapping("/latest")
  public AlertDto findLastAlertBySensorId(
          @RequestParam(name = "sensorId") UUID sensorId
  ) {
    return alertService.findLastAlertBySensorId(sensorId);
  }

}
