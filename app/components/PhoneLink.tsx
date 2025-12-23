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
  phoneNumber = "+12295636488",
  location,
  children,
  className = "",
  showIcon = true,
  iconClassName = "w-4 h-4",
}: PhoneLinkProps) {
  const handleClick = () => {
    // Google Analytics tracking
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "phone_click", {
        event_category: "engagement",
        event_label: location,
        phone_number: phoneNumber,
      });
    }

    // Send notification (fire-and-forget, won't delay call)
    if (typeof window !== "undefined") {
      fetch("/api/track-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location,
          phoneNumber,
          timestamp: new Date().toISOString(),
          referrer: window.location.href,
          userAgent: navigator.userAgent,
        }),
      }).catch(() => {
        // Silently fail - don't affect user experience
      });
    }
  };

  return (
    <a href={`tel:${phoneNumber}`} onClick={handleClick} className={className}>
      {children || (
        <>
          {showIcon && <Phone className={iconClassName} />}
          <span>(229) 563-6488</span>
        </>
      )}
    </a>
  );
}

