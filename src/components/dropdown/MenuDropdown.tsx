import { Dropdown } from "antd";
import { MenuDropdownProps } from "./types";

const MenuDropdown = ({
  children,
  items,
  itemActions,
  trigger,
  isSelectable = false,
  placement = "bottomRight",
  open,
}: MenuDropdownProps) => {
  return (
    <Dropdown
      menu={{ items, onClick: itemActions, selectable: isSelectable }}
      trigger={[trigger]}
      placement={placement}
      open={open}
    >
      {children}
    </Dropdown>
  );
};

export default MenuDropdown;
