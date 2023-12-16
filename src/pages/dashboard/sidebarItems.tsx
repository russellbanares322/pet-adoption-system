import React from "react";
import {
  PieChartOutlined,
  OrderedListOutlined,
  FileSyncOutlined,
  TeamOutlined,
  ReconciliationOutlined,
  WechatOutlined,
  UserOutlined,
  RollbackOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

type SidebarItems = {
  key: string;
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
};

export const sidebarItems: SidebarItems[] = [
  {
    key: "/dashboard",
    icon: <PieChartOutlined />,
    label: "Dashboard",
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
    key: "registered-users",
    icon: <TeamOutlined />,
    label: "Registered Users",
  },
  {
    key: "pet-adoptions",
    icon: <ReconciliationOutlined />,
    label: "Pet Adoptions",
  },
  {
    key: "user-suggestions",
    icon: <WechatOutlined />,
    label: "User Suggestions",
  },
  {
    key: "profile",
    icon: <UserOutlined />,
    label: "Profile",
  },
  {
    key: "return-to-home",
    icon: <RollbackOutlined />,
    label: "Return to Home",
  },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: "Logout",
    danger: true,
  },
];
