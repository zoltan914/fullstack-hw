import { Navigate, Route, Routes } from 'react-router';
import './styles.css';
import Layout from './components/Layout';
import SensorPage from './pages/SensorPage';
import SensorReadingsPage from './pages/SensorReadingsPage';
import AlertPage from './pages/AlertPage';


function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/sensors" replace />} />
        <Route path="/sensors" element={<SensorPage />} />
        <Route path="/sensors/:id" element={<SensorReadingsPage />} />
        <Route path="/alerts" element={<AlertPage />} />
      </Route>
    </Routes>
  );
}

export default App
