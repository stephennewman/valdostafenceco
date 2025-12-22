"use client";

import { useState } from "react";
import Image from "next/image";
import HeroSection from "../components/HeroSection";
import CTAButton from "../components/CTAButton";

const categories = [
  { id: "all", label: "All Projects" },
  { id: "wood", label: "Wood Fencing" },
  { id: "vinyl", label: "Vinyl Fencing" },
  { id: "chain-link", label: "Chain Link" },
  { id: "aluminum", label: "Aluminum" },
  { id: "commercial", label: "Commercial" },
];

// Gallery projects with images
const projects = [
  { id: 1, category: "wood", title: "Privacy Fence - Valdosta", description: "6ft pressure-treated pine privacy fence", image: "/valdostafenceco_1.png" },
  { id: 2, category: "vinyl", title: "White Vinyl - Hahira", description: "Classic white vinyl privacy fence", image: "/valdostafenceco_2.png" },
  { id: 3, category: "wood", title: "Board on Board - Lake Park", description: "Overlapping board design for full privacy", image: "/valdostafenceco_3.png" },
  { id: 4, category: "chain-link", title: "Backyard Enclosure - Valdosta", description: "Galvanized chain link for pet containment", image: "/valdostafenceco_4.png" },
  { id: 5, category: "aluminum", title: "Pool Fence - Valdosta", description: "Black aluminum pool safety fence", image: "/valdostafenceco_5.png" },
  { id: 6, category: "commercial", title: "Warehouse Security - Valdosta", description: "Commercial chain link with barbed wire", image: "/valdostafenceco_6.png" },
  { id: 7, category: "vinyl", title: "Tan Privacy - Valdosta", description: "Tan vinyl fence with decorative top", image: "/valdostafenceco_7.png" },
  { id: 8, category: "wood", title: "Picket Fence - Remerton", description: "Classic white picket fence", image: "/valdostafenceco_8.png" },
  { id: 9, category: "aluminum", title: "Front Yard - Valdosta", description: "Ornamental aluminum fencing", image: "/valdostafenceco_9.png" },
  { id: 10, category: "wood", title: "Ranch Fence - Quitman", description: "Split rail farm fencing", image: "/valdostafenceco_10.png" },
  { id: 11, category: "chain-link", title: "Dog Run - Adel", description: "Chain link kennel enclosure", image: "/valdostafenceco_11.png" },
  { id: 12, category: "commercial", title: "Retail Property - Valdosta", description: "Commercial aluminum perimeter fence", image: "/valdostafenceco.png" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-[var(--red)] text-white"
                    : "bg-[var(--background-alt)] text-[var(--foreground-muted)] hover:bg-[var(--border)]"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-xl overflow-hidden border border-[var(--border)] hover:shadow-lg transition-shadow"
              >
                {/* Project Image */}
                <div className="aspect-[4/3] bg-[var(--background-alt)] flex items-center justify-center relative overflow-hidden">
                  {"image" in project && project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <div className="w-16 h-16 bg-[var(--red)]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-[var(--red)] text-2xl font-bold">
                          {project.id}
                        </span>
                      </div>
                      <span className="text-[var(--foreground-muted)] text-sm">
                        Project Photo
                      </span>
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[var(--red)]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-semibold">View Project</span>
                  </div>
                </div>
                {/* Project Info */}
                <div className="p-4">
                  <span className="text-xs text-[var(--red)] uppercase font-semibold">
                    {categories.find((c) => c.id === project.category)?.label}
                  </span>
                  <h3 className="font-[var(--font-serif)] text-[var(--charcoal-dark)] mt-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--foreground-muted)] mt-1">
                    {project.description}
                  </p>
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


