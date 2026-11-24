import { Navigate, Route, Routes } from 'react-router';
import './styles.css';
import Layout from './components/Layout';
import SensorPage from './pages/SensorPage';
import SensorReadingsPage from './pages/SensorReadingsPage';


function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/sensors" replace />} />
        <Route path="/sensors" element={<SensorPage />} />
        <Route path="/sensors/:id" element={<SensorReadingsPage />} />
      </Route>
    </Routes>
  );
}

export default App
