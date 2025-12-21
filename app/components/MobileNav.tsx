"use client";

import { useEffect } from "react";
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
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
            <span className="font-[var(--font-serif)] text-xl text-[var(--charcoal)]">
              Menu
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[var(--charcoal)] hover:text-[var(--red)]"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-4">
              {navigation.map((item) => (
                <li key={item.name}>
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

          {/* Contact Info */}
          <div className="p-4 border-t border-[var(--border)] space-y-4">
            <PhoneLink
              location="mobile-nav"
              className="flex items-center gap-3 text-[var(--charcoal)] hover:text-[var(--red)]"
              iconClassName="w-5 h-5 text-[var(--red)]"
            />
            <a
              href="mailto:info@valdostafenceco.com"
              className="flex items-center gap-3 text-[var(--charcoal)] hover:text-[var(--red)]"
            >
              <Mail className="w-5 h-5 text-[var(--red)]" />
              <span>info@valdostafenceco.com</span>
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
