import { Dropdown } from "antd";
import { MenuDropdownProps } from "./types";

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
