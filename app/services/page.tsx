import { Metadata } from "next";
import HeroSection from "../components/HeroSection";
import ServiceCard from "../components/ServiceCard";
import CTAButton from "../components/CTAButton";
import { services } from "../data/services";

export const metadata: Metadata = {
  title: "Fencing Services",
  description:
    "Complete fencing services in Valdosta, GA. Wood, vinyl, chain link, aluminum fence installation, repair, and custom gates. Free estimates available.",
  keywords: [
    "fence installation Valdosta",
    "fence services Georgia",
    "wood fence contractor",
    "vinyl fence installation",
    "fence repair Valdosta GA",
  ],
};

export default function ServicesPage() {
  return (
    <>
      <HeroSection
        subtitle="Our Services"
        title="Complete Fencing Solutions"
        description="From installation to repair, residential to commercial – we handle all your fencing needs with quality craftsmanship and honest service."
        primaryCTA={{ text: "Get Free Estimate", href: "/free-estimate" }}
        size="md"
      />

      {/* All Services Grid */}
      <section className="py-16 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-[var(--font-serif)] text-[var(--forest-green)] mb-4">
              All Fencing Services
            </h2>
            <p className="text-lg text-[var(--foreground-muted)]">
              Whatever your fencing needs, we have the expertise and materials to
              deliver results that exceed your expectations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                title={service.shortName}
                description={service.description}
                href={`/services/${service.slug}`}
                icon={service.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-[var(--background-alt)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-[var(--font-serif)] text-[var(--forest-green)] mb-4">
              Our Simple Process
            </h2>
            <p className="text-lg text-[var(--foreground-muted)]">
              Getting your new fence is easy. Here&apos;s how we work:
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Free Consultation",
                description:
                  "Contact us for a free on-site consultation. We'll discuss your needs, measure your property, and answer all your questions.",
              },
              {
                step: "2",
                title: "Detailed Quote",
                description:
                  "Within 24-48 hours, you'll receive a detailed written quote with material options, timeline, and transparent pricing.",
              },
              {
                step: "3",
                title: "Professional Installation",
                description:
                  "Our experienced crew arrives on schedule with all materials and equipment. Most residential projects complete in 1-3 days.",
              },
              {
                step: "4",
                title: "Final Walkthrough",
                description:
                  "We walk you through the completed fence, answer questions, and ensure you're 100% satisfied before we consider the job done.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-[var(--golden-amber)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[var(--forest-green-dark)] font-bold text-xl">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-[var(--font-serif)] text-[var(--forest-green)] mb-2">
                  {item.title}
                </h3>
                <p className="text-[var(--foreground-muted)] text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-[var(--forest-green)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-[var(--font-serif)] text-white mb-4">
            Not Sure Which Fence is Right for You?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            No problem! Our team will help you choose the perfect fence for your
            property, budget, and needs. Contact us for a free consultation.
          </p>
          <CTAButton href="/free-estimate" variant="primary" size="lg">
            Schedule Free Consultation
          </CTAButton>
        </div>
      </section>
    </>
  );
}


