import { useEffect, useState } from "react"
import { type Sensor } from "../interfaces/interfaces"
import { getAllSensors } from "../services/api"
import { useNavigate } from "react-router";

export default function SensorPage() {
  const navigate = useNavigate(); 
  const [sensors, setSensors] = useState<Sensor[]>([])
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllSensors()
      .then(res => {
        setSensors(res.data)
        setError(null)
      })
      .catch(() => setError("Failed to load sensors."))
  }, [])

  return (
    <div className="table__wrapper">
      {error && <p role="alert">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Sensor Name</th>
            <th>Sensor Type</th>
            <th>Alert Count</th>
            <th>Show Sensor</th>
          </tr>
        </thead>
        <tbody>
          {sensors.length === 0 ? (
            <tr><td colSpan={4}>No sensors</td></tr>
          ) : (
            sensors.map(sensor => {
                const alertCount = sensor.alerts.length ?? 0
                return (
                  <tr key={sensor.id}>
                    <td key={sensor.name}>{sensor.name}</td>
                    <td key={sensor.type}>{sensor.type}</td>
                    <td key={`count_${sensor.id}`}>{alertCount}</td>
                    <td>
                      <button 
                        className="btn"
                        onClick={() => navigate(`/sensors/${sensor.id}`)}
                      >Show</button>
                    </td>
                  </tr>
                )
              })
            )
          }
        </tbody>
      </table>
    </div>
  )
}