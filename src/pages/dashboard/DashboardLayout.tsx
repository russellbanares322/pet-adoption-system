import { Breadcrumb, Layout } from "antd";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const location = useLocation();
  const filteredLocation = location.pathname
    .split("/")
    .filter((route) => route !== "");
  const breadCrumbTitle = filteredLocation.map((location) => ({
    title: location.toUpperCase().replace("-", " "),
  }));

  const handleToggleSideNav = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="min-h-screen">
      <DashboardSidebar collapsed={collapsed} />
      <Layout>
        <DashboardHeader
          collapsed={collapsed}
          handleToggleSideNav={handleToggleSideNav}
        />
        <Breadcrumb
          className="mt-5 ml-3 font-semibold"
          items={breadCrumbTitle}
        />
        {children}
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
