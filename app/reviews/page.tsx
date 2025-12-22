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
              <div className="text-4xl font-bold text-[var(--red)]">
                {testimonials.length}+
              </div>
              <p className="text-white text-sm font-medium">Happy Customers</p>
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
              />
            ))}
          </div>
        </div>
      </section>

      {/* Leave a Review */}
      <section className="py-16 lg:py-24 bg-[var(--background-alt)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-[var(--font-serif)] text-[var(--forest-green)] mb-4">
            Are You a Past Customer?
          </h2>
          <p className="text-[var(--foreground-muted)] mb-8">
            We&apos;d love to hear about your experience! Your review helps other
            homeowners find quality fence contractors and helps us continue improving.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://g.page/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-[var(--border)] rounded-lg font-semibold hover:shadow-md transition-shadow"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Leave a Google Review
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-[var(--border)] rounded-lg font-semibold hover:shadow-md transition-shadow"
            >
              <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Leave a Facebook Review
            </a>
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
            Get Free Estimate
          </CTAButton>
        </div>
      </section>
    </>
  );
}


