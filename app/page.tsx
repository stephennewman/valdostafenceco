import {
  TreePine,
  Fence,
  Link2,
  Shield,
  Wrench,
  DoorOpen,
  Users,
  MapPin,
  Award,
  Clock,
  CheckCircle,
} from "lucide-react";
import HeroSection from "./components/HeroSection";
import ServiceCard from "./components/ServiceCard";
import TestimonialCard from "./components/TestimonialCard";
import CTAButton from "./components/CTAButton";
import PhoneLink from "./components/PhoneLink";
import { getFeaturedTestimonials } from "./data/testimonials";

const featuredServices = [
  {
    title: "Wood Fencing",
    description:
      "Classic, natural beauty with customizable styles perfect for any property.",
    href: "/services/wood-fence",
    icon: TreePine,
  },
  {
    title: "Vinyl Fencing",
    description:
      "Low-maintenance, long-lasting fencing that never needs painting or staining.",
    href: "/services/vinyl-fence",
    icon: Fence,
  },
  {
    title: "Chain Link",
    description:
      "Affordable, durable fencing ideal for security and pet containment.",
    href: "/services/chain-link-fence",
    icon: Link2,
  },
  {
    title: "Aluminum Fencing",
    description:
      "Elegant, rust-free fencing with the classic look of wrought iron.",
    href: "/services/aluminum-fence",
    icon: Shield,
  },
  {
    title: "Fence Repair",
    description:
      "Expert repairs for storm damage, rot, leaning posts, and more.",
    href: "/services/fence-repair",
    icon: Wrench,
  },
  {
    title: "Gate Installation",
    description:
      "Custom gates from simple walk-throughs to automated driveway entrances.",
    href: "/services/gate-installation",
    icon: DoorOpen,
  },
];

const whyChooseUs = [
  {
    icon: Users,
    title: "Family Owned",
    description:
      "We're your neighbors, and we take pride in every fence we build.",
  },
  {
    icon: MapPin,
    title: "Truly Local",
    description:
      "Born and raised in Valdosta. We know the community we serve.",
  },
  {
    icon: Award,
    title: "Quality First",
    description:
      "Premium materials and techniques that stand up to South Georgia's climate.",
  },
  {
    icon: Clock,
    title: "Reliable",
    description:
      "We show up when we say we will and finish when we promise.",
  },
];

const serviceAreas = [
  "Valdosta",
  "Hahira",
  "Lake Park",
  "Remerton",
  "Quitman",
  "Adel",
  "Nashville",
  "Lakeland",
];

export default function Home() {
  const testimonials = getFeaturedTestimonials(4);

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        subtitle="Local & Family-Owned"
        title="Valdosta's Trusted Fence Experts"
        description="Quality fencing installation and repair for homes and businesses throughout South Georgia. Family-owned, locally operated, and committed to craftsmanship that lasts."
        primaryCTA={{ text: "Get Free Estimate", href: "/free-estimate" }}
        secondaryCTA={{ text: "View Our Work", href: "/gallery" }}
        size="lg"
      />

      {/* Why Choose Us Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[var(--red)]" />
              <span className="text-[var(--red)] font-semibold text-sm uppercase tracking-wider">
                Why Choose Us
              </span>
              <span className="w-8 h-px bg-[var(--red)]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-[var(--font-serif)] text-[var(--charcoal-dark)] mb-4">
              The Valdosta Fence Co. Difference
            </h2>
            <p className="text-[var(--gray)] leading-relaxed">
              When you hire us, you get more than a fence – you get a commitment to quality from people who care about this community.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="text-center"
              >
                <div className="w-14 h-14 bg-[var(--background-alt)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-[var(--red)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--charcoal-dark)] mb-2">
                  {item.title}
                </h3>
                <p className="text-[var(--gray)] text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-28 bg-[var(--background-alt)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[var(--red)]" />
              <span className="text-[var(--red)] font-semibold text-sm uppercase tracking-wider">
                Our Services
              </span>
              <span className="w-8 h-px bg-[var(--red)]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-[var(--font-serif)] text-[var(--charcoal-dark)] mb-4">
              Fencing Solutions for Every Need
            </h2>
            <p className="text-[var(--gray)] leading-relaxed">
              From wood and vinyl to chain link and aluminum, we install and repair all types of residential and commercial fencing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                href={service.href}
                icon={service.icon}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <CTAButton href="/services" variant="outline">
              View All Services
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-20 lg:py-28 bg-[var(--charcoal-deep)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[var(--red)]" />
                <span className="text-[var(--red-light)] font-semibold text-sm uppercase tracking-wider">
                  Service Area
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-[var(--font-serif)] text-white mb-4">
                Proudly Serving Valdosta & 25 Miles Surrounding
              </h2>
              <p className="text-white/90 mb-8 leading-relaxed">
                From Hahira to Lake Park, Quitman to Lakeland – if you&apos;re within 25
                miles of Valdosta, we&apos;ve got you covered. Same great service, same
                quality craftsmanship, no matter where you are in our service area.
              </p>

              <ul className="grid grid-cols-2 gap-3 mb-8">
                {serviceAreas.map((area) => (
                  <li key={area} className="flex items-center gap-2 text-white text-sm">
                    <CheckCircle className="w-4 h-4 text-[var(--red-light)]" />
                    {area}
                  </li>
                ))}
              </ul>

              <CTAButton href="/service-areas" variant="primary">
                View All Service Areas
              </CTAButton>
            </div>

            <div className="relative">
              {/* Service area visual */}
              <div className="aspect-square max-w-sm mx-auto relative">
                <div className="absolute inset-0 rounded-full border-2 border-white/10" />
                <div className="absolute inset-8 rounded-full border border-white/20" />
                <div className="absolute inset-16 rounded-full border border-white/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[var(--red)] flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                </div>
                <span className="absolute top-2 left-1/2 -translate-x-1/2 text-white/50 text-xs">
                  25 miles
                </span>
                <span className="absolute bottom-1/3 left-1/2 -translate-x-1/2 text-white font-semibold text-sm">
                  Valdosta
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[var(--red)]" />
              <span className="text-[var(--red)] font-semibold text-sm uppercase tracking-wider">
                Reviews
              </span>
              <span className="w-8 h-px bg-[var(--red)]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-[var(--font-serif)] text-[var(--charcoal-dark)] mb-4">
              What Our Customers Say
            </h2>
            <p className="text-[var(--gray)] leading-relaxed">
              Don&apos;t just take our word for it – hear from homeowners and businesses throughout South Georgia who trust Valdosta Fence Co.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                location={testimonial.location}
                rating={testimonial.rating}
                text={testimonial.text}
                service={testimonial.service}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <CTAButton href="/reviews" variant="outline">
              Read More Reviews
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 lg:py-28 bg-[var(--background-alt)] border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-[var(--font-serif)] text-[var(--charcoal-dark)] mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-[var(--gray)] mb-8 leading-relaxed">
            Get a free, no-obligation estimate for your fencing project. We&apos;ll come
            to you, assess your needs, and provide a detailed quote – all at no cost.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href="/free-estimate" variant="primary" size="lg">
              Get Free Estimate
            </CTAButton>
            <PhoneLink
              location="homepage-cta"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--charcoal)] text-white rounded-sm font-semibold text-base hover:bg-[var(--charcoal-dark)] transition-colors"
              iconClassName="w-5 h-5"
            />
          </div>
        </div>
      </section>
    </>
  );
}
