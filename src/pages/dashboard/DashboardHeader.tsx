import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import useUserInfo from "../../hooks/useUserInfo";

type DashboardHeaderProps = {
  collapsed: boolean;
  handleToggleSideNav: () => void;
};

const DashboardHeader = ({
  collapsed,
  handleToggleSideNav,
}: DashboardHeaderProps) => {
  const { Header } = Layout;
  const { displayName } = useUserInfo();

  return (
    <Header className="p-0 bg-white">
      <div className="flex justify-between items-center">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={handleToggleSideNav}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <p className="mr-5 text-base">
          Hi, <span className="font-bold">{displayName}</span>
        </p>
      </div>
    </Header>
  );
};

export default DashboardHeader;
