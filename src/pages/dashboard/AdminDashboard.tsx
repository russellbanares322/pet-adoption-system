import { Layout } from "antd";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import DashboardLandingPage from "./DashboardLandingPage";
import DashboardLayout from "./DashboardLayout";

const AdminDashboard = () => {
  const { Content } = Layout;
  const location = useLocation();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const isInDashboardPage = location.pathname === "/dashboard";
  const isAdminLoggedIn =
    user?.email === import.meta.env.VITE_APP_ADMIN_ACCOUNT;

  const contentStyle = {
    margin: "18px 16px",
    padding: 24,
    minHeight: 280,
    background: "#FDFDFD",
    overflow: "initial",
    borderRadius: "0.7rem",
  };

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate("/");
    }
  }, []);
  return (
    <DashboardLayout>
      <Content style={contentStyle}>
        {isInDashboardPage ? <DashboardLandingPage /> : <Outlet />}
      </Content>
    </DashboardLayout>
  );
};

export default AdminDashboard;
