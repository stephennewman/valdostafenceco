import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowLeft } from "lucide-react";
import HeroSection from "../../components/HeroSection";
import CTAButton from "../../components/CTAButton";
import FAQAccordion from "../../components/FAQAccordion";
import PhoneLink from "../../components/PhoneLink";
import { services, getServiceBySlug, getAllServiceSlugs } from "../../data/services";

interface ServicePageProps {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ service: slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { service } = await params;
  const serviceData = getServiceBySlug(service);

  if (!serviceData) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${serviceData.name} in Valdosta, GA`,
    description: `${serviceData.description} Professional ${serviceData.shortName.toLowerCase()} services in Valdosta, GA and surrounding areas. Free estimates available.`,
    keywords: serviceData.keywords,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { service } = await params;
  const serviceData = getServiceBySlug(service);

  if (!serviceData) {
    notFound();
  }

  const Icon = serviceData.icon;

  // Get related services (exclude current)
  const relatedServices = services
    .filter((s) => s.slug !== service)
    .slice(0, 3);

  return (
    <>
      <HeroSection
        subtitle={serviceData.shortName}
        title={`${serviceData.name} in Valdosta, GA`}
        description={serviceData.description}
        primaryCTA={{ text: "Get Free Estimate", href: "/free-estimate" }}
        secondaryCTA={{ text: "Call Now", href: "tel:+12295636488" }}
        size="md"
      />

      {/* Breadcrumb */}
      <div className="bg-[var(--background-alt)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--forest-green)] transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Services
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="prose max-w-none mb-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-[var(--forest-green)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-8 h-8 text-[var(--forest-green)]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-[var(--font-serif)] text-[var(--forest-green)] mt-0 mb-2">
                      About Our {serviceData.shortName} Services
                    </h2>
                    <p className="text-[var(--foreground-muted)] m-0">
                      {serviceData.longDescription}
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-12">
                <h2 className="text-2xl font-[var(--font-serif)] text-[var(--forest-green)] mb-6">
                  Benefits of {serviceData.shortName}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {serviceData.benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-start gap-3 p-4 bg-[var(--background-alt)] rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-[var(--golden-amber)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--foreground)]">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-12">
                <h2 className="text-2xl font-[var(--font-serif)] text-[var(--forest-green)] mb-6">
                  What&apos;s Included
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {serviceData.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[var(--golden-amber)] rounded-full" />
                      <span className="text-[var(--foreground-muted)]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Placeholder Gallery */}
              <div className="mb-12">
                <h2 className="text-2xl font-[var(--font-serif)] text-[var(--forest-green)] mb-6">
                  Project Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-[var(--background-alt)] rounded-lg flex items-center justify-center border border-[var(--border)]"
                    >
                      <span className="text-[var(--foreground-muted)] text-sm">
                        Project Photo {i}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[var(--foreground-muted)] mt-4">
                  <Link
                    href="/gallery"
                    className="text-[var(--golden-amber-dark)] hover:underline"
                  >
                    View our full gallery
                  </Link>{" "}
                  for more {serviceData.shortName.toLowerCase()} projects.
                </p>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-[var(--font-serif)] text-[var(--forest-green)] mb-6">
                  Frequently Asked Questions
                </h2>
                <FAQAccordion items={serviceData.faqs} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* CTA Card */}
              <div className="bg-[var(--forest-green)] rounded-xl p-6 text-white mb-6 sticky top-24">
                <h3 className="font-[var(--font-serif)] text-xl mb-2">
                  Ready to Get Started?
                </h3>
                <p className="text-white/80 text-sm mb-6">
                  Get a free, no-obligation estimate for your{" "}
                  {serviceData.shortName.toLowerCase()} project.
                </p>
                <CTAButton href="/free-estimate" variant="primary" fullWidth>
                  Get Free Estimate
                </CTAButton>
                <div className="mt-4 text-center">
                  <span className="text-white/60 text-sm">or call us</span>
                  <PhoneLink
                    location="service-page-sidebar"
                    className="flex items-center justify-center gap-2 mt-2 text-[var(--golden-amber)] font-semibold hover:text-[var(--golden-amber-light)]"
                  />
                </div>
              </div>

              {/* Related Services */}
              <div className="bg-[var(--background-alt)] rounded-xl p-6">
                <h3 className="font-[var(--font-serif)] text-lg text-[var(--forest-green)] mb-4">
                  Related Services
                </h3>
                <ul className="space-y-3">
                  {relatedServices.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                      >
                        <s.icon className="w-5 h-5 text-[var(--golden-amber)]" />
                        <span className="text-[var(--foreground)] text-sm font-medium">
                          {s.shortName}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/services"
                  className="block text-center text-[var(--golden-amber-dark)] text-sm mt-4 hover:underline"
                >
                  View All Services
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
            Get Your {serviceData.shortName} Quote Today
          </h2>
          <p className="text-white/90 mb-8">
            Free estimates, honest pricing, and quality craftsmanship – that&apos;s
            the Valdosta Fence Co difference.
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
    </>
  );
}


