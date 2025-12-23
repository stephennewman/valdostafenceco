"use client";

import Image from "next/image";
import HeroSection from "../components/HeroSection";
import CTAButton from "../components/CTAButton";

// Gallery projects with images and SEO-optimized alt text
const projects = [
  { id: 1, image: "/valdostafenceco_1.png", alt: "Wood privacy fence installation in Valdosta GA backyard" },
  { id: 2, image: "/valdostafenceco_2.png", alt: "Residential wood fence with gate installed in South Georgia" },
  { id: 3, image: "/valdostafenceco_3.png", alt: "Custom cedar fence construction Valdosta Georgia" },
  { id: 4, image: "/valdostafenceco_4.png", alt: "Professional fence installation crew working in Lowndes County" },
  { id: 5, image: "/valdostafenceco_5.png", alt: "Privacy fence for residential property in Hahira GA" },
  { id: 6, image: "/valdostafenceco_6.png", alt: "Wood fence with decorative lattice top Valdosta" },
  { id: 7, image: "/valdostafenceco_7.png", alt: "Backyard fence installation South Georgia home" },
  { id: 8, image: "/valdostafenceco_8.png", alt: "Pressure treated wood fence Valdosta fence company" },
  { id: 9, image: "/valdostafenceco_9.png", alt: "Fence repair and replacement project Lake Park GA" },
  { id: 10, image: "/valdostafenceco_10.png", alt: "New fence installation residential Valdosta Georgia" },
  { id: 11, image: "/valdostafenceco_11.png", alt: "Quality fence craftsmanship South Georgia contractor" },
  { id: 12, image: "/valdostafenceco.png", alt: "Valdosta Fence Co completed fence project" },
];

export default function GalleryPage() {
  return (
    <>
      <HeroSection
        subtitle="Our Work"
        title="Project Gallery"
        description="See examples of our fencing work throughout Valdosta and South Georgia."
        size="sm"
      />

      <section className="py-16 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Gallery Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-xl overflow-hidden border border-[var(--border)] hover:shadow-lg transition-shadow"
              >
                {/* Project Image */}
                <div className="aspect-[4/3] bg-[var(--background-alt)] flex items-center justify-center relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[var(--red)]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-semibold">View Project</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-[var(--foreground-muted)] text-sm mb-6">
              Want to see more of our work? Contact us to schedule an on-site visit or discuss your project.
            </p>
            <CTAButton href="/free-estimate" variant="outline">
              Get Your Free Estimate
            </CTAButton>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[var(--charcoal-deep)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-[var(--font-serif)] text-white mb-4">
            Ready for Your Own Project?
          </h2>
          <p className="text-white/90 mb-8">
            Let us build something beautiful for your property. Get a free estimate today.
          </p>
          <CTAButton href="/free-estimate" variant="primary" size="lg">
            Get Free Estimate
          </CTAButton>
        </div>
      </section>
    </>
  );
}
