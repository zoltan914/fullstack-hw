import { Outlet } from "react-router";

function Header() {
    return (
      <header className="header">
          IoT Monitoring Dashboard
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