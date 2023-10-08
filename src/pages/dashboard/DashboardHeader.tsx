import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";

type DashboardHeaderProps = {
  collapsed: boolean;
  handleToggleSideNav: () => void;
};

const DashboardHeader = ({
  collapsed,
  handleToggleSideNav,
}: DashboardHeaderProps) => {
  const { Header } = Layout;

  return (
    <Header style={{ padding: 0, background: "#FDFDFD" }}>
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
    </Header>
  );
};

export default DashboardHeader;
