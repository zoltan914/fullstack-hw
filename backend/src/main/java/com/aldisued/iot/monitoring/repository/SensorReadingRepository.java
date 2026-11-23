package com.aldisued.iot.monitoring.repository;

import com.aldisued.iot.monitoring.entity.SensorReading;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;

public interface SensorReadingRepository extends JpaRepository<SensorReading, String> {

    @Query("""
       select round(avg(s.value), 1)
       from SensorReading s
       where s.timestamp between :from and :to
           and s.sensor.type = 'TEMPERATURE'
    """)
    Optional<Double> getAverageTemperatureBetween(@Param("from") LocalDateTime from,
                                                  @Param("to") LocalDateTime to);

}
