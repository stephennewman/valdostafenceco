import { Metadata } from "next";
import { Star } from "lucide-react";
import HeroSection from "../components/HeroSection";
import TestimonialCard from "../components/TestimonialCard";
import CTAButton from "../components/CTAButton";
import { testimonials } from "../data/testimonials";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Read what our customers say about Valdosta Fence Co. Real reviews from homeowners and businesses throughout South Georgia.",
  alternates: {
    canonical: "/reviews",
  },
};

export default function ReviewsPage() {
  const averageRating = (
    testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length
  ).toFixed(1);

  return (
    <>
      <HeroSection
        subtitle="Customer Reviews"
        title="What Our Customers Say"
        description="Don't just take our word for it – hear from homeowners and businesses throughout South Georgia."
        size="sm"
      />

      {/* Rating Summary */}
      <section className="py-12 bg-[var(--charcoal-deep)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-[var(--red)]">
                {averageRating}
              </div>
              <div className="flex gap-1 justify-center my-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-[var(--red)] fill-[var(--red)]"
                  />
                ))}
              </div>
              <p className="text-white text-sm font-medium">Average Rating</p>
            </div>
            <div className="h-px w-24 md:h-24 md:w-px bg-white/20" />
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--red)]">100%</div>
              <p className="text-white text-sm font-medium">Would Recommend</p>
            </div>
          </div>
        </div>
      </section>

      {/* All Reviews */}
      <section className="py-16 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                location={testimonial.location}
                rating={testimonial.rating}
                text={testimonial.text}
                service={testimonial.service}
                avatar={testimonial.avatar}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--cedar-brown)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-[var(--font-serif)] text-white mb-4">
            Join Our Happy Customers
          </h2>
          <p className="text-white/90 mb-8">
            Experience the quality and service that earned us these reviews. Get your
            free estimate today.
          </p>
          <CTAButton href="/free-estimate" variant="primary" size="lg">
            Schedule Estimate
          </CTAButton>
        </div>
      </section>
    </>
  );
}


