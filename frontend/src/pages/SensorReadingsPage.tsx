import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import type { SensorReading, SensorReadingDto } from "../interfaces/interfaces";
import { getAllReadingsBySensorId, saveSensorReading } from "../services/api";
import { formatTimestamp } from "../utils/dateFormatter";

export default function SensorReadingsPage() {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const [readings, setReadings] = useState<SensorReading[]>([]); // Ide jönnek majd a mérések
  const [error, setError] = useState<string | null>(null);

  // form states
  const [valueInput, setValueInput] = useState<string>("");
  const [timestampInput, setTimestampInput] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!valueInput || !timestampInput) {
      alert("Please fill all the fields in the form!");
      return;
    }

    // 1. A KULCS: Kicseréljük a magyar vesszőt pontra, majd Double (float) számmá alakítjuk
    const cleanValue = valueInput.replace(",", ".");
    const numericValue = parseFloat(cleanValue);

    if (isNaN(numericValue)) {
      alert("Invalid number format!");
      return;
    }
    // 2. Időpont validálása: Üres-e a mező?
    if (!timestampInput || timestampInput.trim() === "") {
      alert("Please select a valid date and time!");
      return;
    }

    // 3. Időpont validálása: Létező, értelmes dátum-e?
    const inputDate = new Date(timestampInput);
    if (isNaN(inputDate.getTime())) {
      alert("Invalid date or time format!");
      return;
    } 

    // 4. A KULCS: Évszám ellenőrzése (pl. ne lehessen 12121 vagy 0001)
    const inputYear = inputDate.getFullYear();
    const currentYear = new Date().getFullYear();

    if (inputYear < 2000 || inputYear > currentYear + 1) {
      alert(`Please enter a realistic year (between 2000 and ${currentYear + 1})!`);
      return;
    }

    if (inputDate > new Date()) {
      alert("The timestamp cannot be in the future!");
      return;
    }

    // Ezt az objektumot küldheted el a backendnek
    const newReading: SensorReadingDto = {
      value: numericValue, // Ez már garantáltan Double lesz (pl. 16.2)
      timestamp: inputDate, // '2026-11-24T15:10:00' formátum
      sensorId: id!
    };

    try {
      const response = await saveSensorReading(newReading)
      setReadings(prevReadings => [...prevReadings, response.data])

      setValueInput("")
      setTimestampInput("")
      alert("Sensor reading saved successfully!")
    } catch(error) {
      console.error("Failed to save sensor reading:", error);
      setError('Failed to save sensor reading')
    }
  };



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
      <button className="btn" onClick={() => navigate(-1)}>← Back</button>
      {error && <p role="alert">{error}</p>}
      <p>Sensor Readings (ID: {id})</p>
      <div className="sensor_reading__wrapper">
        <div className="table__wrapper">
          <table>
            <thead>
              <tr>
                <th>Value</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {readings.length == 0 ? (
                 <tr><td colSpan={2}>No data</td></tr>
                ) : (
                  readings.map(reading => {
                    return (
                      <tr key={reading.id}>
                        <td key={`val_${reading.id}`}>{reading.value}</td>
                        <td key={`time_${reading.id}`}>{formatTimestamp(reading.timestamp)}</td>
                      </tr>
                    )
                  })
                )
              }
            </tbody>
          </table>
        </div>
        <form className="form__wrapper" onSubmit={handleSubmit}>
          <h2>Add new sensor reading</h2>
          <div className="form__grid">
            <label htmlFor="value">Value:</label>
            <input 
              id="value" 
              type="text" /* Biztonságosabb text-ként kezelni, ha kézzel írják be a vesszőt */
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value)}
              placeholder="pl. 16,2"
            />

            <label htmlFor="timestamp">Timestamp:</label>
            <input 
              id="timestamp" 
              type="datetime-local" 
              step="1"
              value={timestampInput}
              onChange={(e) => setTimestampInput(e.target.value)}
            />
          </div>
          <button type="submit" className="btn" style={{ marginTop: '16px' }}>Add Reading</button>
        </form>
      </div>
      
    </div>
  )
}