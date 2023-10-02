import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { routes } from "./routes/routes";

function App() {
  return (
    <div className="font-karla">
      <Navbar />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
