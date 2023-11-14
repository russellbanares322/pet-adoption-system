import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import React from "react";

type TriggerOptions = "click" | "hover";

type MenuDropdownProps = {
  children: React.ReactNode;
  items: MenuProps["items"];
  itemActions: MenuProps["onClick"];
  trigger: TriggerOptions;
};

const MenuDropdown = ({
  children,
  items,
  itemActions,
  trigger,
}: MenuDropdownProps) => {
  return (
    <Dropdown
      menu={{ items, onClick: itemActions }}
      trigger={[trigger]}
      placement="bottomRight"
    >
      {children}
    </Dropdown>
  );
};

export default MenuDropdown;
