import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { type Alert, type Sensor } from "../interfaces/interfaces";
import { getAllAlerts, getAllSensors } from "../services/api";
import { formatTimestamp } from "../utils/dateFormatter";


const POLL_INTERVAL_MS = 5000;


export default function AlertPage() {
  const navigate = useNavigate(); 
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [error, setError] = useState<string | null>(null);

  // szenzorok egyszer töltődnek be (a névfeloldáshoz)
  useEffect(() => {
    getAllSensors()
      .then(res => setSensors(res.data))
      .catch(() => setError("Failed to load sensors."));
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchAlerts = async () => {
      // console.log('fetched')
      try {
        const res = await getAllAlerts();
        if (!cancelled) {
          setAlerts(res.data);
          setError(null);
        }
      } catch {
        if (!cancelled) setError("Failed to load alerts.");
      }
    };
    fetchAlerts();
    const timer = setInterval(fetchAlerts, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [])

  const sensorNames = useMemo(() => 
    new Map(sensors.map(s => [s.id, s.name])), 
    [sensors]
  )
  const sortedAlerts = useMemo(
    () => 
      [...alerts].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ),
    [alerts]
  )


  return (
    <div>
      <button className="btn" style={{marginBottom: '20px'}} onClick={() => navigate("/sensors")}>← Back</button>
      {error && <p role="alert">{error}</p>}
      <div className="table__wrapper">
        <table>
          <thead>
            <tr>
              <th>Message</th>
              <th>Sensor</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {sortedAlerts.length === 0 ? (
              <tr key={'no-data'}><td colSpan={3}>No alerts</td></tr>
            ) : (
              sortedAlerts.map((alert, i) => (
                <tr key={i}>
                  <td key={`message_${i}`}>{alert.message}</td>
                  <td key={`sensor_${i}`}>{sensorNames.get(alert.sensorId) ?? alert.sensorId}</td>
                  <td key={`time_${i}`}>{formatTimestamp(alert.timestamp)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  )

}
