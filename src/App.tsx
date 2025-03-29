import { BrowserRouter, useRoutes } from "react-router-dom";
import AgGridPOC from "./ag-grid";
import GlideGridPOC from "./glid-grid";
import LandingPage from "./landing-page";
import "./App.css";
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
  ]);
  return routes;
}
