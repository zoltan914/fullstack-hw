import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { type Alert } from "../interfaces/interfaces";
import { getAllAlerts } from "../services/api";

export default function AlertPage() {
  const navigate = useNavigate(); 
  const [alerts, setAlerts] = useState<Alert[]>([])
  console.log(alerts)
  useEffect(() => {
    const fetchData = async () => {
      const allAlerts = await getAllAlerts()
      setAlerts(allAlerts.data)
    }
    fetchData()
  }, [])


  return (
    <div>
      <button className="btn" onClick={() => navigate("/sensors")}>← Back</button>
      <div>
        <table>
          {alerts.map(alert => {
            return (
              <tr>
                <td>{alert.message}</td>
              </tr>
            )
          })}
        </table>
      </div>
      
    </div>
  )

}
