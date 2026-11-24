package com.aldisued.iot.monitoring.repository;

import com.aldisued.iot.monitoring.entity.SensorReading;
import com.aldisued.iot.monitoring.entity.SensorType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SensorReadingRepository extends JpaRepository<SensorReading, String> {

    @Query("""
       select round(avg(s.value), 1)
       from SensorReading s
       where s.timestamp between :from and :to
           and s.sensor.type = 'TEMPERATURE'
    """)
    Optional<Double> getAverageTemperatureBetween(@Param("from") LocalDateTime from,
                                                  @Param("to") LocalDateTime to);

    @Query("""
        select s.value
        from SensorReading s
        where s.timestamp between :from and :to
           and s.sensor.type = :sensorType
        order by s.timestamp
    """)
    List<Double> getMeasurementValuesBySensorType(
            @Param("sensorType") SensorType sensorType,
            @Param("from") LocalDateTime from,
            @Param("to") LocalDateTime to
    );

    List<SensorReading> findAllBySensorId(UUID sensorId);
}
