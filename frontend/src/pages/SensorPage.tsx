import { useEffect, useState } from "react"
import { type Sensor } from "../interfaces/interfaces"
import { getAllSensors } from "../services/api"
import { useNavigate } from "react-router";

export default function SensorPage() {
  const [sensors, setSensors] = useState<Sensor[]>([])
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      const allSensors = await getAllSensors()
      setSensors(allSensors.data)
    }
    fetchData()
  }, [])

  return (
    <div className="table__wrapper">
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