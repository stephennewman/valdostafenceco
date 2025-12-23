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
      // Parse UTM parameters for marketing attribution
      const urlParams = new URLSearchParams(window.location.search);
      const utmParams = {
        utm_source: urlParams.get("utm_source"),
        utm_medium: urlParams.get("utm_medium"),
        utm_campaign: urlParams.get("utm_campaign"),
        utm_term: urlParams.get("utm_term"),
        utm_content: urlParams.get("utm_content"),
        gclid: urlParams.get("gclid"), // Google Ads click ID
        fbclid: urlParams.get("fbclid"), // Facebook click ID
      };

      // Detect device type
      const screenWidth = window.screen.width;
      const isMobile = screenWidth < 768;
      const isTablet = screenWidth >= 768 && screenWidth < 1024;
      const deviceType = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";

      // Get session duration (time on site)
      const sessionStart = sessionStorage.getItem("vfc_session_start");
      let sessionDuration = 0;
      if (sessionStart) {
        sessionDuration = Math.round((Date.now() - parseInt(sessionStart)) / 1000);
      } else {
        sessionStorage.setItem("vfc_session_start", Date.now().toString());
      }

      fetch("/api/track-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location,
          phoneNumber,
          timestamp: new Date().toISOString(),
          currentPage: window.location.href,
          originalReferrer: document.referrer || "direct",
          userAgent: navigator.userAgent,
          deviceType,
          screenSize: `${window.screen.width}x${window.screen.height}`,
          viewport: `${window.innerWidth}x${window.innerHeight}`,
          language: navigator.language,
          sessionDurationSeconds: sessionDuration,
          ...utmParams,
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

