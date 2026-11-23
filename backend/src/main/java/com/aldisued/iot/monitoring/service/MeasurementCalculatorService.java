package com.aldisued.iot.monitoring.service;


import java.util.Collections;
import java.util.List;
import java.util.OptionalDouble;

import org.springframework.stereotype.Service;

@Service
public class MeasurementCalculatorService {

  public List<Double> filterByAverageDeviation(List<Double> values, Double deviation) {
    // TODO: Task 9
    if (deviation == null || deviation < 0 || deviation > 1) {
      throw new IllegalArgumentException("deviation must be between 0 and 1");
    }

    if (values == null || values.isEmpty()) {
      return Collections.emptyList();
    }

    OptionalDouble avg = values.stream()
            .mapToDouble(Double::doubleValue)
            .average();

    if (avg.isEmpty()) {
      return Collections.emptyList();
    }
    double average = avg.getAsDouble();
    double acceptableRangeStart = average - deviation * average;
    double acceptableRangeEnd   = average + deviation * average;

    // return only numbers that are in the range [start, end]
    return values.stream()
            .filter(num -> acceptableRangeStart <= num && num <= acceptableRangeEnd)
            .toList();
  }

  public List<Double> getMovingAverage(List<Double> data, int windowSize) {
    // TODO: Task 10
    return List.of();
  }

}
