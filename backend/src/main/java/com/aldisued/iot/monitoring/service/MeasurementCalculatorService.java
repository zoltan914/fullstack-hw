package com.aldisued.iot.monitoring.service;


import java.util.ArrayList;
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

    if (windowSize <= 0) {
      throw new IllegalArgumentException("windowSize must be greater than 0");
    }
    if (windowSize > data.size()) {
      throw new IllegalArgumentException("data size must be greater than window size");
    }
    List<Double> result = new ArrayList<>();
    int j = 0; // right pointer

    // initial step (calculate the first window sum)
    double sum = 0;
    while (j < windowSize) {
      sum += data.get(j++);
    }
    result.add(sum / windowSize);

    // j's position is currently at windowSize (j = 3)
    // run the loop until j reaches end of data list
    for (int i = 0; j < data.size(); i++) {
      sum -= data.get(i);
      sum += data.get(j);
      result.add(sum / windowSize);
      j++;
    }
    return result;
  }

}
