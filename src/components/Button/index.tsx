import React from "react";
import "./styles.css";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
