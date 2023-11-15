import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import React from "react";

type TriggerOptions = "click" | "hover";
type MenuDropdownPlacements =
  | "bottom"
  | "bottomLeft"
  | "bottomRight"
  | "top"
  | "topLeft"
  | "topRight";

type MenuDropdownProps = {
  children: React.ReactNode;
  items: MenuProps["items"];
  itemActions: MenuProps["onClick"];
  trigger: TriggerOptions;
  isSelectable?: boolean;
  placement?: MenuDropdownPlacements;
};

const MenuDropdown = ({
  children,
  items,
  itemActions,
  trigger,
  isSelectable = false,
  placement = "bottomRight",
}: MenuDropdownProps) => {
  return (
    <Dropdown
      menu={{ items, onClick: itemActions, selectable: isSelectable }}
      trigger={[trigger]}
      placement={placement}
    >
      {children}
    </Dropdown>
  );
};

export default MenuDropdown;
