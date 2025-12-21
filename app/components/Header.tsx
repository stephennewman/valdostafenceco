"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import CTAButton from "./CTAButton";
import MobileNav from "./MobileNav";
import PhoneLink from "./PhoneLink";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Service Areas", href: "/service-areas" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Reviews", href: "/reviews" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-[var(--border)]">
        {/* Top Bar */}
        <div className="bg-[var(--charcoal)] text-white py-2 px-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
            <span className="text-white/80">Serving Valdosta & 25 Miles Surrounding</span>
            <PhoneLink
              location="header-topbar"
              className="flex items-center gap-2 hover:text-[var(--red-light)] transition-colors font-medium"
            >
              <span className="hidden sm:inline">(229) 563-6488</span>
            </PhoneLink>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[var(--charcoal)] flex items-center justify-center group-hover:border-[var(--red)] transition-colors flex-shrink-0">
                <span className="text-[var(--red)] font-bold text-base sm:text-lg">V</span>
              </div>
              <span className="font-[var(--font-serif)] text-base sm:text-xl text-[var(--charcoal)] tracking-tight">
                Valdosta Fence Co.
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-[var(--charcoal)] hover:text-[var(--red)] transition-colors font-medium text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <CTAButton href="/free-estimate" variant="primary">
                Free Estimate
              </CTAButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2 text-[var(--charcoal)] hover:text-[var(--red)] transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigation={navigation}
      />

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[var(--border)] p-3 flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <PhoneLink
          location="mobile-sticky-cta"
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--charcoal)] text-white rounded-sm font-semibold"
          iconClassName="w-5 h-5"
        >
          Call Now
        </PhoneLink>
        <CTAButton href="/free-estimate" variant="primary" className="flex-1">
          Free Estimate
        </CTAButton>
      </div>
    </>
  );
}
