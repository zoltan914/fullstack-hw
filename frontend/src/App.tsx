import { Route, Routes } from 'react-router';
import './styles.css';
import Layout from './components/Layout';
import SensorPage from './pages/SensorPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<SensorPage />} />
      </Route>
    </Routes>
  );
}

export default App
