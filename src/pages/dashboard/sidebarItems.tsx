import React from "react";
import {
  UserOutlined,
  PieChartOutlined,
  OrderedListOutlined,
  FileSyncOutlined,
  SettingOutlined,
} from "@ant-design/icons";

type SidebarItems = {
  key: string;
  icon: React.ReactNode;
  label: string;
};

export const sidebarItems: SidebarItems[] = [
  {
    key: "/dashboard",
    icon: <PieChartOutlined />,
    label: "Dashboard",
  },
  {
    key: "profile",
    icon: <UserOutlined />,
    label: "Profile",
  },
  {
    key: "listed-pets",
    icon: <OrderedListOutlined />,
    label: "Listed Pets",
  },
  {
    key: "pending-posts",
    icon: <FileSyncOutlined />,
    label: "Pending Posts",
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "Settings",
  },
];
