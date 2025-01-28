"use client";
import React, { FC } from "react";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";

export const buttonVariants = ["primary", "secondary", "danger"] as const;
export type ButtonVariant = (typeof buttonVariants)[number];

export const buttonSizes = ["sm", "md", "lg"] as const;
export type ButtonSize = (typeof buttonSizes)[number];

export const buttonStyles = ["default", "round"] as const;
export type ButtonStyle = (typeof buttonStyles)[number];

export interface ButtonProps {
  id?: string;
  size?: ButtonSize;
  buttonStyle?: ButtonStyle;
  variant?: ButtonVariant;
  text: string;
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
  onClick?: (id?: string, event?: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  className?: string;
  textColor?: string;
  iconColor?: string;
  endIcon?: LucideIcon;
}

const getButtonClasses = (
  variant: ButtonVariant,
  disabled: boolean,
  size: ButtonSize,
  buttonStyle: ButtonStyle
) => {
  const baseClasses =
    "flex items-center justify-center font-medium transition-all";

  const variantClasses = {
    primary: `bg-primary-500 text-white ${
      disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-600"
    }`,
    secondary: `bg-secondary-500 text-white ${
      disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-secondary-600"
    }`,
    danger: `bg-red-500 text-white ${
      disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
    }`,
  };

  const sizeClasses = {
    sm: "px-3 py-3 text-sm",
    md: "px-5 py-4 text-base",
    lg: "px-6 py-5 text-lg",
  };

  const styleClasses = {
    default: "rounded-md",
    round: "rounded-full",
  };

  return clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    styleClasses[buttonStyle]
  );
};

const Button: FC<ButtonProps> = ({
  id,
  type = "button",
  size = "md",
  buttonStyle = "default",
  variant = "primary",
  disabled = false,
  text,
  onClick,
  isLoading = false,
  textColor = "",
  className = "w-full",
  iconColor = "white",
  endIcon: EndIcon,
}) => {
  const buttonClasses = getButtonClasses(variant, disabled, size, buttonStyle);

  return (
    <button
      id={id}
      type={type}
      disabled={disabled || isLoading}
      onClick={(event) => onClick?.(id, event)}
      className={clsx(buttonClasses, className)}
    >
      {isLoading ? (
        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
      ) : (
        <>
          <span className={clsx(textColor)}>{text}</span>
          {EndIcon && <EndIcon className={clsx(`ml-2 h-5 w-5 ${iconColor}`)} />}
        </>
      )}
    </button>
  );
};

export default Button;
