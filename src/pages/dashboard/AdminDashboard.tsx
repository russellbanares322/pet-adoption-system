import { Layout } from "antd";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useUserInfo from "../../hooks/useUserInfo";
import DashboardLandingPage from "./DashboardLandingPage";
import DashboardLayout from "./DashboardLayout";

const AdminDashboard = () => {
  const { Content } = Layout;
  const location = useLocation();
  const navigate = useNavigate();
  const { uid } = useUserInfo();
  const isInDashboardPage = location.pathname === "/dashboard";
  const isAdminLoggedIn = uid === import.meta.env.VITE_APP_ADMIN_UID;

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
  }, [isAdminLoggedIn]);

  return (
    <DashboardLayout>
      <Content style={contentStyle}>
        {isInDashboardPage ? <DashboardLandingPage /> : <Outlet />}
      </Content>
    </DashboardLayout>
  );
};

export default AdminDashboard;
