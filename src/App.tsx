import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { auth } from "./firebase/firebase-config";
import useLocalStorage from "./hooks/useLocalStorage";
import { routes } from "./routes/routes";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const [user] = useAuthState(auth);
  const location = useLocation();
  const { saveItemInLocalStorage, getItemFromLocalStorage } = useLocalStorage();
  const userInfo = getItemFromLocalStorage("user-info");
  const userDataRemovedInLocalStorage =
    user !== null && Object.values(userInfo).length === 0;
  const flattenRoutesPath = routes.flatMap((item) => item.path);
  const isRouteInvalid = !flattenRoutesPath.includes(location.pathname);
  const isInDashboardRoute = location.pathname.includes("dashboard");

  const renderElement = (isProtected: boolean, element: React.ReactElement) => {
    if (isProtected) {
      return <ProtectedRoute>{element}</ProtectedRoute>;
    } else {
      return element;
    }
  };


  useEffect(() => {
    if (userDataRemovedInLocalStorage) {
      const userData = {
        displayName: user?.displayName,
        email: user?.email,
        uid: user?.uid,
      };
      saveItemInLocalStorage("user-info", userData);
    }
  }, [user, userDataRemovedInLocalStorage]);

  return (
    <div className="min-h-[100vh] h-full">
      {!isRouteInvalid && !isInDashboardRoute && <Navbar />}
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
