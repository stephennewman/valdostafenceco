import { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight, CheckCircle } from "lucide-react";
import HeroSection from "../components/HeroSection";
import CTAButton from "../components/CTAButton";
import { areas } from "../data/areas";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Valdosta Fence Co. serves Valdosta, GA and surrounding areas within a 25-mile radius. See all the towns and communities we serve.",
  keywords: [
    "fence company near me",
    "fence installation Valdosta GA",
    "fence contractor Hahira",
    "fence service Lake Park",
    "South Georgia fence company",
  ],
  alternates: {
    canonical: "/service-areas",
  },
};

export default function ServiceAreasPage() {
  return (
    <>
      <HeroSection
        subtitle="Service Areas"
        title="Proudly Serving South Georgia"
        description="From Valdosta to all communities within a 25-mile radius – we bring quality fencing to your neighborhood."
        primaryCTA={{ text: "Schedule Estimate", href: "/free-estimate" }}
        size="md"
      />

      {/* Map Visual Section */}
      <section className="py-16 lg:py-24 bg-[var(--charcoal-deep)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Map Visualization */}
            <div className="order-2 lg:order-1">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Concentric circles */}
                <div className="absolute inset-0 rounded-full border-2 border-white/10" />
                <div className="absolute inset-[12%] rounded-full border border-white/15" />
                <div className="absolute inset-[24%] rounded-full border border-white/20" />
                <div className="absolute inset-[36%] rounded-full border border-white/25" />
                
                {/* Center marker */}
                <div className="absolute inset-[42%] bg-[var(--red)] rounded-full flex items-center justify-center shadow-lg shadow-[var(--red)]/30">
                  <MapPin className="w-8 h-8 text-white" />
                </div>

                {/* Labels */}
                <span className="absolute top-2 left-1/2 -translate-x-1/2 text-white/40 text-xs uppercase tracking-wider">
                  25 miles
                </span>
                <span className="absolute bottom-[38%] left-1/2 -translate-x-1/2 text-white font-semibold text-sm">
                  Valdosta
                </span>

                {/* Area markers */}
                <div className="absolute top-[18%] left-1/2 -translate-x-1/2">
                  <div className="w-2.5 h-2.5 bg-white/60 rounded-full" />
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-xs whitespace-nowrap">Hahira</span>
                </div>
                <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2">
                  <div className="w-2.5 h-2.5 bg-white/60 rounded-full" />
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-xs whitespace-nowrap">Lake Park</span>
                </div>
                <div className="absolute top-[32%] right-[18%]">
                  <div className="w-2.5 h-2.5 bg-white/60 rounded-full" />
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-xs whitespace-nowrap">Quitman</span>
                </div>
                <div className="absolute top-[32%] left-[18%]">
                  <div className="w-2.5 h-2.5 bg-white/60 rounded-full" />
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-xs whitespace-nowrap">Lakeland</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[var(--red)]" />
                <span className="text-[var(--red-light)] font-semibold text-sm uppercase tracking-wider">
                  Our Coverage
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-[var(--font-serif)] text-white mb-6">
                25 Miles of Quality Service
              </h2>
              <p className="text-white/70 mb-8 leading-relaxed">
                Based in Valdosta, we travel to all surrounding communities to
                deliver the same exceptional service. Whether you&apos;re in downtown
                Valdosta or out in the countryside, we treat every customer like
                a neighbor.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-white/90">
                  <CheckCircle className="w-5 h-5 text-[var(--red-light)] flex-shrink-0" />
                  Same great prices across all service areas
                </li>
                <li className="flex items-center gap-3 text-white/90">
                  <CheckCircle className="w-5 h-5 text-[var(--red-light)] flex-shrink-0" />
                  No extra travel fees
                </li>
                <li className="flex items-center gap-3 text-white/90">
                  <CheckCircle className="w-5 h-5 text-[var(--red-light)] flex-shrink-0" />
                  Free on-site estimates everywhere we serve
                </li>
                <li className="flex items-center gap-3 text-white/90">
                  <CheckCircle className="w-5 h-5 text-[var(--red-light)] flex-shrink-0" />
                  Knowledge of local codes and requirements
                </li>
              </ul>
              <p className="text-white/50 text-sm">
                Not sure if you&apos;re in our service area?{" "}
                <Link
                  href="/contact"
                  className="text-[var(--red-light)] hover:text-white transition-colors"
                >
                  Contact us
                </Link>{" "}
                and we&apos;ll let you know!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[var(--red)]" />
              <span className="text-[var(--red)] font-semibold text-sm uppercase tracking-wider">
                Towns We Serve
              </span>
              <span className="w-8 h-px bg-[var(--red)]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-[var(--font-serif)] text-[var(--charcoal-dark)] mb-4">
              Communities We Serve
            </h2>
            <p className="text-[var(--gray)] leading-relaxed">
              Click on your town to learn more about our services in your area.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="group bg-[var(--background-alt)] rounded-sm p-6 border border-[var(--border)] hover:border-[var(--red)]/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-[var(--red)]" />
                      <span className="text-xs text-[var(--gray)] font-medium">
                        {area.distance}
                      </span>
                    </div>
                    <h3 className="text-xl font-[var(--font-serif)] text-[var(--charcoal-dark)] group-hover:text-[var(--red)] transition-colors mb-1">
                      {area.name}
                    </h3>
                    <p className="text-sm text-[var(--gray)]">
                      {area.county}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[var(--red)] opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-[var(--background-alt)] border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-[var(--font-serif)] text-[var(--charcoal-dark)] mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-[var(--gray)] mb-8 leading-relaxed">
            No matter where you are in our service area, you&apos;ll get the same
            quality, professionalism, and fair pricing Valdosta Fence Co. is known
            for.
          </p>
          <CTAButton href="/free-estimate" variant="primary" size="lg">
            Schedule Your Estimate
          </CTAButton>
        </div>
      </section>
    </>
  );
}
