import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import type { SensorReading } from "../interfaces/interfaces";
import { getAllReadingsBySensorId } from "../services/api";
import { formatTimestamp } from "../utils/dateFormatter";

export default function SensorReadingsPage() {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const [readings, setReadings] = useState<SensorReading[]>([]); // Ide jönnek majd a mérések


  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const allReadings = await getAllReadingsBySensorId(id)
      setReadings(allReadings.data)
    }
    fetchData()
  }, [id]);


  return (
    <div>
      <button className="btn" onClick={() => navigate(-1)}>← Vissza</button>
      <p>Sensor Readings (ID: {id})</p>
      <div className="sensor_reading__wrapper">
        <div className="table__wrapper">
          <table>
            <thead>
              <tr>
                <th>value</th>
                <th>timestamp</th>
              </tr>
            </thead>
            <tbody>
              {readings.map(reading => {
                return (
                  <tr>
                    <td>{reading.value}</td>
                    <td>{formatTimestamp(reading.timestamp)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <form className="form__wrapper">
          <h2>Add new sensor reading</h2>
          <div className="form__grid">
            <label htmlFor="value">Value:</label>
            <input id="value" type="number" step="any" />

            <label htmlFor="timestamp">Timestamp:</label>
            <input id="timestamp" type="datetime-local" step="1" />
          </div>
          <button type="submit" className="btn" style={{ marginTop: '16px' }}>Add Reading</button>
        </form>
      </div>
      
    </div>
  )
}