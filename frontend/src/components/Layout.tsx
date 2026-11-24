import { Outlet, useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate(); 
  return (
    <header className="header">
        IoT Monitoring Dashboard
        <span style={{paddingRight: '20px'}}/>
        <button 
          className="btn"
          onClick={() => navigate('/alerts')}
        >
          Alerts
        </button>
    </header>
  )
}


export default function Layout() {
  return (
    <>
      <Header />
      <main id="tartalom">
        <Outlet />
      </main>
    </>
  );
}