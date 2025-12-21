"use client";

import { Phone } from "lucide-react";
import { ReactNode } from "react";

interface PhoneLinkProps {
  phoneNumber?: string;
  location: string; // e.g., "header", "footer", "hero", "mobile-nav"
  children?: ReactNode;
  className?: string;
  showIcon?: boolean;
  iconClassName?: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function PhoneLink({
  phoneNumber = "+12295551234",
  location,
  children,
  className = "",
  showIcon = true,
  iconClassName = "w-4 h-4",
}: PhoneLinkProps) {
  const handleClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "phone_click", {
        event_category: "engagement",
        event_label: location,
        phone_number: phoneNumber,
      });
    }
  };

  return (
    <a href={`tel:${phoneNumber}`} onClick={handleClick} className={className}>
      {children || (
        <>
          {showIcon && <Phone className={iconClassName} />}
          <span>(229) 555-1234</span>
        </>
      )}
    </a>
  );
}

