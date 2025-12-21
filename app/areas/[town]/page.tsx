import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowLeft, CheckCircle } from "lucide-react";
import HeroSection from "../../components/HeroSection";
import CTAButton from "../../components/CTAButton";
import ServiceCard from "../../components/ServiceCard";
import PhoneLink from "../../components/PhoneLink";
import { areas, getAreaBySlug, getAllAreaSlugs } from "../../data/areas";
import { services } from "../../data/services";

interface AreaPageProps {
  params: Promise<{ town: string }>;
}

export async function generateStaticParams() {
  return getAllAreaSlugs().map((slug) => ({ town: slug }));
}

export async function generateMetadata({
  params,
}: AreaPageProps): Promise<Metadata> {
  const { town } = await params;
  const area = getAreaBySlug(town);

  if (!area) {
    return { title: "Area Not Found" };
  }

  return {
    title: `Fence Installation in ${area.name}, GA`,
    description: `Professional fence installation and repair in ${area.name}, Georgia. Valdosta Fence Co serves ${area.name} and all of ${area.county}. Free estimates available.`,
    keywords: [
      `fence installation ${area.name} GA`,
      `fence company ${area.name}`,
      `fence contractor ${area.county}`,
      `${area.name} Georgia fencing`,
    ],
  };
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { town } = await params;
  const area = getAreaBySlug(town);

  if (!area) {
    notFound();
  }

  // Get featured services (first 6)
  const featuredServices = services.slice(0, 6);

  // Get other areas for sidebar
  const otherAreas = areas.filter((a) => a.slug !== town).slice(0, 5);

  return (
    <>
      <HeroSection
        subtitle={area.county}
        title={`Fence Services in ${area.name}, GA`}
        description={`Quality fence installation and repair for ${area.name} homes and businesses. Your local, family-owned fence experts.`}
        primaryCTA={{ text: "Get Free Estimate", href: "/free-estimate" }}
        secondaryCTA={{ text: "Call Now", href: "tel:+12295636488" }}
        size="md"
      />

      {/* Breadcrumb */}
      <div className="bg-[var(--background-alt)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link
            href="/service-areas"
            className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--forest-green)] transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Service Areas
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* About Area */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-[var(--golden-amber)]" />
                  <span className="text-[var(--foreground-muted)]">
                    {area.distance} from Valdosta
                  </span>
                </div>
                <h2 className="text-2xl font-[var(--font-serif)] text-[var(--forest-green)] mb-4">
                  Fencing Services in {area.name}
                </h2>
                <p className="text-[var(--foreground-muted)] leading-relaxed">
                  {area.description}
                </p>
              </div>

              {/* Neighborhoods */}
              {area.neighborhoods && area.neighborhoods.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-xl font-[var(--font-serif)] text-[var(--forest-green)] mb-4">
                    Areas We Serve in {area.name}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {area.neighborhoods.map((neighborhood) => (
                      <div
                        key={neighborhood}
                        className="flex items-center gap-2 p-3 bg-[var(--background-alt)] rounded-lg"
                      >
                        <CheckCircle className="w-4 h-4 text-[var(--golden-amber)]" />
                        <span className="text-[var(--foreground)]">
                          {neighborhood}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Services Available */}
              <div className="mb-12">
                <h3 className="text-xl font-[var(--font-serif)] text-[var(--forest-green)] mb-6">
                  Services Available in {area.name}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {featuredServices.map((service) => (
                    <ServiceCard
                      key={service.slug}
                      title={service.shortName}
                      description={service.description}
                      href={`/services/${service.slug}`}
                      icon={service.icon}
                    />
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link
                    href="/services"
                    className="text-[var(--golden-amber-dark)] hover:underline font-medium"
                  >
                    View All Services →
                  </Link>
                </div>
              </div>

              {/* Why Choose Us for This Area */}
              <div className="bg-[var(--background-alt)] rounded-xl p-6">
                <h3 className="text-xl font-[var(--font-serif)] text-[var(--forest-green)] mb-4">
                  Why {area.name} Chooses Valdosta Fence Co
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--golden-amber)] mt-0.5" />
                    <span className="text-[var(--foreground-muted)]">
                      <strong className="text-[var(--foreground)]">Local expertise</strong> – We know {area.county}&apos;s soil, weather, and building codes
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--golden-amber)] mt-0.5" />
                    <span className="text-[var(--foreground-muted)]">
                      <strong className="text-[var(--foreground)]">No travel fees</strong> – Same great prices as Valdosta customers
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--golden-amber)] mt-0.5" />
                    <span className="text-[var(--foreground-muted)]">
                      <strong className="text-[var(--foreground)]">Free estimates</strong> – We come to you for a no-obligation consultation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--golden-amber)] mt-0.5" />
                    <span className="text-[var(--foreground-muted)]">
                      <strong className="text-[var(--foreground)]">Quality guaranteed</strong> – Same craftsmanship that built our reputation
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* CTA Card */}
              <div className="bg-[var(--forest-green)] rounded-xl p-6 text-white mb-6 sticky top-24">
                <h3 className="font-[var(--font-serif)] text-xl mb-2">
                  Need a Fence in {area.name}?
                </h3>
                <p className="text-white/80 text-sm mb-6">
                  Get a free estimate from your local fence experts. We&apos;ll come
                  to you!
                </p>
                <CTAButton href="/free-estimate" variant="primary" fullWidth>
                  Get Free Estimate
                </CTAButton>
                <div className="mt-4 text-center">
                  <span className="text-white/60 text-sm">or call us</span>
                  <PhoneLink
                    location="area-page-sidebar"
                    className="flex items-center justify-center gap-2 mt-2 text-[var(--golden-amber)] font-semibold hover:text-[var(--golden-amber-light)]"
                  />
                </div>
              </div>

              {/* Other Areas */}
              <div className="bg-[var(--background-alt)] rounded-xl p-6">
                <h3 className="font-[var(--font-serif)] text-lg text-[var(--forest-green)] mb-4">
                  We Also Serve
                </h3>
                <ul className="space-y-2">
                  {otherAreas.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/areas/${a.slug}`}
                        className="flex items-center gap-2 p-2 hover:bg-white rounded-lg transition-colors"
                      >
                        <MapPin className="w-4 h-4 text-[var(--golden-amber)]" />
                        <span className="text-[var(--foreground)]">{a.name}</span>
                        <span className="text-xs text-[var(--foreground-muted)] ml-auto">
                          {a.distance}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/service-areas"
                  className="block text-center text-[var(--golden-amber-dark)] text-sm mt-4 hover:underline"
                >
                  View All Service Areas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[var(--cedar-brown)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-[var(--font-serif)] text-white mb-4">
            Ready for Your {area.name} Fence Project?
          </h2>
          <p className="text-white/90 mb-8">
            Contact us today for a free, no-obligation estimate. We&apos;ll bring
            quality fencing to your {area.name} property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href="/free-estimate" variant="primary" size="lg">
              Get Free Estimate
            </CTAButton>
            <CTAButton href="/contact" variant="outline" size="lg">
              Contact Us
            </CTAButton>
          </div>
        </div>
      </section>

      {/* LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Valdosta Fence Co",
            description: `Professional fence installation and repair services in ${area.name}, ${area.county}, Georgia.`,
            areaServed: {
              "@type": "City",
              name: area.name,
              containedIn: {
                "@type": "State",
                name: "Georgia",
              },
            },
            serviceArea: {
              "@type": "GeoCircle",
              geoMidpoint: {
                "@type": "GeoCoordinates",
                latitude: 30.8327,
                longitude: -83.2785,
              },
              geoRadius: "40233.6", // 25 miles in meters
            },
          }),
        }}
      />
    </>
  );
}


