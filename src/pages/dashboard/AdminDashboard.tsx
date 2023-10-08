import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import DashboardLandingPage from "./DashboardLandingPage";
import DashboardLayout from "./DashboardLayout";

const AdminDashboard = () => {
  const { Content } = Layout;
  const location = useLocation();
  const isInDashboardPage = location.pathname === "/dashboard";

  const contentStyle = {
    margin: "18px 16px",
    padding: 24,
    minHeight: 280,
    background: "#FDFDFD",
    overflow: "initial",
    borderRadius: "0.7rem",
  };

  return (
    <DashboardLayout>
      <Content style={contentStyle}>
        {isInDashboardPage ? <DashboardLandingPage /> : <Outlet />}
      </Content>
    </DashboardLayout>
  );
};

export default AdminDashboard;
