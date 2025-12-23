import Link from "next/link";
import { Mail, MapPin, Clock } from "lucide-react";
import PhoneLink from "./PhoneLink";

const services = [
  { name: "Wood Fencing", href: "/services/wood-fence" },
  { name: "Vinyl Fencing", href: "/services/vinyl-fence" },
  { name: "Chain Link Fencing", href: "/services/chain-link-fence" },
  { name: "Aluminum Fencing", href: "/services/aluminum-fence" },
  { name: "Fence Repair", href: "/services/fence-repair" },
  { name: "Gate Installation", href: "/services/gate-installation" },
];

const areas = [
  { name: "Valdosta", href: "/areas/valdosta" },
  { name: "Hahira", href: "/areas/hahira" },
  { name: "Lake Park", href: "/areas/lake-park" },
  { name: "Quitman", href: "/areas/quitman" },
  { name: "Adel", href: "/areas/adel" },
  { name: "View All Areas", href: "/service-areas" },
];

const company = [
  { name: "About Us", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Reviews", href: "/reviews" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
  { name: "Free Estimate", href: "/free-estimate" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--charcoal-deep)] text-white pb-24 lg:pb-0">
      {/* Red accent line */}
      <div className="h-1 bg-[var(--red)]" />
      
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center">
                <span className="text-[var(--red-light)] font-bold text-lg">V</span>
              </div>
              <span className="font-[var(--font-serif)] text-xl">
                Valdosta Fence Co.
              </span>
            </div>
            <p className="text-white/70 mb-6 text-sm leading-relaxed">
              Your local, family-owned fence experts. Quality craftsmanship and
              honest service since day one.
            </p>
            <div className="space-y-3">
              <PhoneLink
                location="footer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm"
                iconClassName="w-4 h-4 text-[var(--red-light)]"
              />
              <a
                href="mailto:stephen@valdostafenceco.com"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4 text-[var(--red-light)]" />
                stephen@valdostafenceco.com
              </a>
              <div className="flex items-center gap-3 text-white/70 text-sm">
                <MapPin className="w-4 h-4 text-[var(--red-light)]" />
                Valdosta, GA & 25 mi radius
              </div>
              <div className="flex items-center gap-3 text-white/70 text-sm">
                <Clock className="w-4 h-4 text-[var(--red-light)]" />
                Mon-Fri: 7am-6pm, Sat: 8am-2pm
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">
              Our Services
            </h3>
            <ul className="space-y-2">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">
              Service Areas
            </h3>
            <ul className="space-y-2">
              {areas.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">
              Company
            </h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-white/50 text-sm">
            <p>&copy; {currentYear} Valdosta Fence Co. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
