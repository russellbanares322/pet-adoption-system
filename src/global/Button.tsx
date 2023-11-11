import { Button as AntdButton } from "antd";
import React from "react";

type ButtonTypes = "primary" | "dashed" | "link" | "text" | "default";
type ButtonSizes = "large" | "middle" | "small";
type ButtonProps = {
  type: ButtonTypes;
  danger?: boolean;
  title: string;
  icon: React.ReactNode;
  size?: ButtonSizes;
  styleClass?: string;
  disabled?: boolean;
  onClick?: () => void;
};
const Button = ({
  type,
  danger = false,
  title,
  icon,
  size = "middle",
  styleClass,
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <AntdButton
      onClick={onClick}
      className={styleClass}
      type={type}
      danger={danger}
      icon={icon}
      size={size}
      disabled={disabled}
    >
      {title}
    </AntdButton>
  );
};

export default Button;
