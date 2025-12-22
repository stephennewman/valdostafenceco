"use client";

import Link from "next/link";
import { clsx } from "clsx";

interface CTAButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function CTAButton({
  href,
  onClick,
  variant = "primary",
  size = "md",
  children,
  className,
  type = "button",
  fullWidth = false,
  disabled = false,
}: CTAButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-[var(--red)] text-white hover:bg-[var(--red-dark)] focus:ring-[var(--red)] rounded-sm",
    secondary:
      "bg-[var(--charcoal)] text-white hover:bg-[var(--charcoal-dark)] focus:ring-[var(--charcoal)] rounded-sm",
    outline:
      "border-2 border-[var(--charcoal)] text-[var(--charcoal)] hover:bg-[var(--charcoal)] hover:text-white focus:ring-[var(--charcoal)] bg-transparent rounded-sm",
  };

  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-base",
  };

  const classes = clsx(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
