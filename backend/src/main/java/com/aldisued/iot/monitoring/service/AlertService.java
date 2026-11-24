package com.aldisued.iot.monitoring.service;

import com.aldisued.iot.monitoring.dto.AlertDto;
import com.aldisued.iot.monitoring.entity.Alert;
import com.aldisued.iot.monitoring.entity.Sensor;
import com.aldisued.iot.monitoring.repository.AlertRepository;
import com.aldisued.iot.monitoring.repository.SensorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class AlertService {

  private final AlertRepository alertRepository;
  private final SensorRepository sensorRepository;
  private final KafkaTemplate<String, AlertDto> kafkaTemplate;

  private static final String ALERTS_TOPIC = "alerts";

  public AlertService(AlertRepository alertRepository, SensorRepository sensorRepository,
      KafkaTemplate<String, AlertDto> kafkaTemplate) {
    this.alertRepository = alertRepository;
    this.sensorRepository = sensorRepository;
    this.kafkaTemplate = kafkaTemplate;
  }

  public List<Alert> getAllAlerts() {
    return alertRepository.findAll();
  }

  public Alert saveAlert(AlertDto alertDto) {
    // TODO: Task 6
    Sensor sensor = sensorRepository.findById(alertDto.sensorId())
            .orElseThrow(() -> new RuntimeException("Sensor with id: " + alertDto.sensorId() + " not found"));

    // save new alert to database
    Alert alert = new Alert();
    alert.setMessage(alertDto.message());
    alert.setTimestamp(alertDto.timestamp());
    alert.setSensor(sensor);
    Alert savedAlert = alertRepository.save(alert);

    // send message to ALERTS_TOPIC
    kafkaTemplate.send(ALERTS_TOPIC, alertDto);

    return savedAlert;
  }

  public AlertDto findLastAlertBySensorId(UUID sensorId) {
    // TODO: Task 5
    return alertRepository.findFirstBySensorIdOrderByTimestampDesc(sensorId)
            .map(latestAlert -> new AlertDto(
                    latestAlert.getSensor().getId(),
                    latestAlert.getMessage(),
                    latestAlert.getTimestamp()
            ))
            .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "No alert found for the given sensor ID: " + sensorId
            ));
  }
}
