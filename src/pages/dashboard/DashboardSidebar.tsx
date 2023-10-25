import { Badge, Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetchPendingPets } from "../../api/pets/pets";
import { sidebarItems } from "./sidebarItems";

type DashboardSidebarProps = {
  collapsed: boolean;
};

const DashboardSidebar = ({ collapsed }: DashboardSidebarProps) => {
  const { Sider } = Layout;
  const { Item } = Menu;
  const { data: petsData } = useFetchPendingPets();
  const pendingPetsCount = petsData.length;
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
      className="overflow-auto fixed left-0 top-0 bottom-0"
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
      >
        {sidebarItems.map((item) => (
          <Item
            className="flex gap-2 items-center relative"
            onClick={() => navigatePath(item.key)}
            key={item.key}
          >
            {item.icon} <span>{item.label}</span>
            {item.key === "pending-posts" && pendingPetsCount > 0 && (
              <Badge
                className="absolute top-2 right-2"
                color="blue"
                count={pendingPetsCount}
              />
            )}
          </Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default DashboardSidebar;
