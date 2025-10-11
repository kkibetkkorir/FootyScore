import Betslip from "./components/betslip/Betslip";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { BETTING_FREE } from "./constants";
import Detail from "./pages/detail/Detail";
import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Leagues from "./pages/leagues/Leagues";
import { useState } from "react";
import Fixtures from "./pages/home/Fixtures";

const Layout = () => {
  const [visible, setVisible] = useState(false);

  const handleToggle = () => {
    setVisible(!visible)
  }
  return (
    <div className="container" >
      <Header />
      <Outlet />
      {!BETTING_FREE && <Betslip visible={visible} setVisible={setVisible}/>}
      < Footer />
      {!BETTING_FREE &&<div className="slip-toggle" id="slipToggle" onClick={handleToggle}>
        <i className="fas fa-receipt"></i>
        <span className="slip-count" id="toggleCount">2</span>
      </div>}
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/fixtures",
        element: <Fixtures />
      },
      {
        path: "/single/:id",
        element: <Detail />
      },
      {
        path: "/leagues",
        element: <Leagues />
      },
    ]
  },
]);


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;