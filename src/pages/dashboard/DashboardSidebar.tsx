import { Badge, Layout, Menu } from "antd";
import { signOut } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetchApplicationsByRecipientId } from "../../api/adoptions/adoptions";
import { useFetchPendingPets } from "../../api/pets/pets";
import { auth } from "../../firebase/firebase-config";
import useLocalStorage from "../../hooks/useLocalStorage";
import { sidebarItems } from "./sidebarItems";

type DashboardSidebarProps = {
  collapsed: boolean;
};

const DashboardSidebar = ({ collapsed }: DashboardSidebarProps) => {
  const { Sider } = Layout;
  const { Item } = Menu;
  const { data: petsData } = useFetchPendingPets();
  const { data: applicationsData } = useFetchApplicationsByRecipientId();
  const { removeItemFromLocalStorage } = useLocalStorage();
  const adoptionsApplicationsCount = applicationsData?.filter(
    (data) => data.status.toLowerCase() === "to be reviewed"
  ).length;
  const pendingPetsCount = petsData.length;
  const navigate = useNavigate();
  const location = useLocation();
  const convertedLocation = location.pathname.split("/");
  const currentLocation =
    location.pathname === "/dashboard"
      ? "/dashboard"
      : `${convertedLocation[convertedLocation.length - 1]}`;

  const navigatePath = (selectedKey: string) => {
    if (selectedKey === "return-to-home") {
      return navigate("/");
    }
    if (selectedKey === "logout") {
      signOut(auth);
      removeItemFromLocalStorage("user-info");
      navigate("/");
    }

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
        {sidebarItems.map((item) => {
          const logoutItem = item.key === "logout";
          const petAdoptionItem = item.key === "pet-adoptions";
          const pendingPostsItem = item.key === "pending-posts";
          return (
            <Item
              className={`flex gap-2 items-center relative ${
                logoutItem && "text-red-500"
              }`}
              onClick={() => navigatePath(item.key)}
              key={item.key}
            >
              {item.icon} <span>{item.label}</span>
              {pendingPostsItem && pendingPetsCount > 0 && (
                <Badge
                  className="absolute top-2 right-2"
                  color="blue"
                  count={pendingPetsCount}
                />
              )}
              {petAdoptionItem && adoptionsApplicationsCount > 0 && (
                <Badge
                  className="absolute top-2 right-2"
                  color="blue"
                  count={adoptionsApplicationsCount}
                />
              )}
            </Item>
          );
        })}
      </Menu>
    </Sider>
  );
};

export default DashboardSidebar;
