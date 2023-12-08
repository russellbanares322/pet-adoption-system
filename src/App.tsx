import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { routes } from "./routes/routes";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const renderElement = (isProtected: boolean, element: React.ReactElement) => {
    if (isProtected) {
      return <ProtectedRoute>{element}</ProtectedRoute>;
    } else {
      return element;
    }
  };

  return (
    <div className="min-h-[100vh] h-full">
      <Navbar />
      <Routes>
        {routes.map((route: any) => {
          const elementHasChild = route.child.length > 0;

          return elementHasChild ? (
            <Route
              key={route.path}
              path={route.path}
              element={renderElement(route.isProtected, route.element)}
            >
              {route?.child?.map((childEl: any) => (
                <Route
                  key={childEl.path}
                  path={childEl.path}
                  element={renderElement(childEl.isProtected, childEl.element)}
                />
              ))}
            </Route>
          ) : (
            <Route
              key={route.path}
              path={route.path}
              element={renderElement(route.isProtected, route.element)}
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
