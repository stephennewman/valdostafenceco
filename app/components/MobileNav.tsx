"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Mail } from "lucide-react";
import CTAButton from "./CTAButton";
import PhoneLink from "./PhoneLink";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: { name: string; href: string }[];
}

export default function MobileNav({
  isOpen,
  onClose,
  navigation,
}: MobileNavProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Small delay to trigger CSS transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
      document.body.style.overflow = "hidden";
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before hiding
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      document.body.style.overflow = "";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop with fade */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-out ${
          isAnimating ? "opacity-50" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out panel */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
            <span className="font-[var(--font-serif)] text-xl text-[var(--charcoal)]">
              Menu
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[var(--charcoal)] hover:text-[var(--red)] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links with staggered animation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-4">
              {navigation.map((item, index) => (
                <li
                  key={item.name}
                  className={`transition-all duration-300 ease-out ${
                    isAnimating
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  }`}
                  style={{
                    transitionDelay: isAnimating ? `${index * 50}ms` : "0ms",
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-3 px-4 text-lg text-[var(--charcoal)] hover:bg-[var(--background-alt)] hover:text-[var(--red)] rounded-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info with fade-in */}
          <div
            className={`p-4 border-t border-[var(--border)] space-y-4 transition-all duration-300 ease-out ${
              isAnimating
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isAnimating ? "200ms" : "0ms" }}
          >
            <PhoneLink
              location="mobile-nav"
              className="flex items-center gap-3 text-[var(--charcoal)] hover:text-[var(--red)] transition-colors"
              iconClassName="w-5 h-5 text-[var(--red)]"
            />
            <a
              href="mailto:stephen@valdostafenceco.com"
              className="flex items-center gap-3 text-[var(--charcoal)] hover:text-[var(--red)] transition-colors"
            >
              <Mail className="w-5 h-5 text-[var(--red)]" />
              <span>stephen@valdostafenceco.com</span>
            </a>

            <CTAButton href="/free-estimate" variant="primary" fullWidth>
              Get Free Estimate
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
