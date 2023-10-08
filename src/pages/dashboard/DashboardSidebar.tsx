import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarItems } from "./sidebarItems";

type DashboardSidebarProps = {
  collapsed: boolean;
};

const DashboardSidebar = ({ collapsed }: DashboardSidebarProps) => {
  const { Sider } = Layout;
  const navigate = useNavigate();
  const location = useLocation();
  const convertedLocation = location.pathname.split("/");
  const currentLocation =
    location.pathname === "/dashboard"
      ? "/dashboard"
      : `${convertedLocation[convertedLocation.length - 1]}`;

  const navigatePath = (selectedKey: string) => {
    return navigate(selectedKey);
  };

  return (
    <Sider
      className="overflow-auto fixed left-0 top-0 bottom-0 "
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <Menu
        className="mt-5"
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["/dashboard"]}
        selectedKeys={[currentLocation]}
        items={sidebarItems}
        onClick={(menu) => navigatePath(menu.key)}
      />
    </Sider>
  );
};

export default DashboardSidebar;
