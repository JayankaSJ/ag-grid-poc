import { BrowserRouter, useRoutes } from "react-router-dom";
import AgGridPOC from "./ag-grid";
import GlideGridPOC from "./glid-grid";
import LandingPage from "./landing-page";
import { AgGridCommercialPOC } from "./ag-grid-commercial";

// @ts-expect-error temporary fix
import "./App.css";

// @ts-expect-error temporary fix
import "@glideapps/glide-data-grid/dist/index.css";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ height: "100vh" }}>
        <Router />
      </div>
    </BrowserRouter>
  );
}

function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/ag-grid",
      element: <AgGridPOC />,
    },
    {
      path: "/glide-grid",
      element: <GlideGridPOC />,
    },
    {
      path: "/glide-grid-commercial",
      element: <AgGridCommercialPOC />,
    },
  ]);
  return routes;
}
