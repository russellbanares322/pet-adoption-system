import type { MenuProps } from "antd";

export type TriggerOptions = "click" | "hover" | "contextMenu";

export type MenuDropdownPlacements =
  | "bottom"
  | "bottomLeft"
  | "bottomRight"
  | "top"
  | "topLeft"
  | "topRight";

export type MenuDropdownProps = {
  children: React.ReactNode;
  items: MenuProps["items"];
  itemActions: MenuProps["onClick"];
  trigger: TriggerOptions;
  isSelectable?: boolean;
  placement?: MenuDropdownPlacements;
};
