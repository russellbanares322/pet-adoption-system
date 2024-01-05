import { Button as AntdButton } from "antd";
import React from "react";

type ButtonTypes = "primary" | "dashed" | "link" | "text" | "default";
type ButtonSizes = "large" | "middle" | "small";
type ButtonProps = {
  type: ButtonTypes;
  danger?: boolean;
  title?: string;
  icon: React.ReactNode;
  size?: ButtonSizes;
  styleClass?: string;
  disabled?: boolean;
  onClick?: () => void;
  ghost?: boolean;
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
  ghost = false,
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
      ghost={ghost}
    >
      {title}
    </AntdButton>
  );
};

export default Button;
