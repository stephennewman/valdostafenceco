import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import HeroSection from "../components/HeroSection";
import ContactForm from "../components/ContactForm";
import PhoneLink from "../components/PhoneLink";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Valdosta Fence Co. for a free estimate or to discuss your fencing project. Call (229) 563-6488 or fill out our contact form.",
};

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "(229) 563-6488",
    href: "tel:+12295636488",
    description: "Call us for immediate assistance",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@valdostafenceco.com",
    href: "mailto:info@valdostafenceco.com",
    description: "We respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Service Area",
    value: "Valdosta, GA & 25mi radius",
    href: "/service-areas",
    description: "Serving South Georgia",
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "Mon-Fri 7am-6pm",
    href: null,
    description: "Sat 8am-2pm | Sun Closed",
  },
];

export default function ContactPage() {
  return (
    <>
      <HeroSection
        subtitle="Contact Us"
        title="Get in Touch"
        description="Have questions about your fencing project? We're here to help."
        size="sm"
      />

      <section className="py-16 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-8 border border-[var(--border)]">
                <h2 className="text-2xl font-[var(--font-serif)] text-[var(--forest-green)] mb-2">
                  Send Us a Message
                </h2>
                <p className="text-[var(--foreground-muted)] mb-6">
                  Fill out the form below and we&apos;ll get back to you within 24
                  hours.
                </p>
                <ContactForm />
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div
                    key={item.title}
                    className="bg-white rounded-xl p-6 border border-[var(--border)]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[var(--golden-amber)]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-[var(--golden-amber-dark)]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[var(--forest-green)]">
                          {item.title}
                        </h3>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-[var(--foreground)] hover:text-[var(--golden-amber-dark)] transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className="text-[var(--foreground)]">
                            {item.value}
                          </span>
                        )}
                        <p className="text-sm text-[var(--foreground-muted)] mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Note */}
              <div className="mt-6 bg-[var(--forest-green)] rounded-xl p-6 text-white">
                <h3 className="font-[var(--font-serif)] text-lg mb-2">
                  Prefer to Talk?
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  Sometimes it&apos;s easier to just pick up the phone. We&apos;re happy to
                  discuss your project and answer any questions.
                </p>
                <PhoneLink
                  location="contact-sidebar"
                  className="inline-flex items-center gap-2 bg-[var(--golden-amber)] text-[var(--forest-green-dark)] px-4 py-2 rounded-lg font-semibold hover:bg-[var(--golden-amber-light)] transition-colors"
                >
                  Call Now
                </PhoneLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


