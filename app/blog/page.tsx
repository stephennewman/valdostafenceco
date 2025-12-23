import { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import HeroSection from "../components/HeroSection";
import CTAButton from "../components/CTAButton";
import { blogPosts } from "../data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Fencing tips, guides, and insights from Valdosta Fence Co. Learn about fence materials, costs, maintenance, and local requirements in South Georgia.",
  alternates: {
    canonical: "/blog",
  },
};

const categories = Array.from(new Set(blogPosts.map((p) => p.category)));

export default function BlogPage() {
  return (
    <>
      <HeroSection
        subtitle="Blog"
        title="Fencing Tips & Guides"
        description="Expert advice on fence materials, installation, maintenance, and more from your local Valdosta fence experts."
        size="sm"
      />

      <section className="py-16 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Blog Posts */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {blogPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-white rounded-xl border border-[var(--border)] overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Placeholder Image */}
                    <div className="aspect-[2/1] bg-[var(--background-alt)] flex items-center justify-center">
                      <span className="text-[var(--foreground-muted)]">
                        Featured Image
                      </span>
                    </div>

                    <div className="p-6">
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-[var(--foreground-muted)] mb-3">
                        <span className="bg-[var(--golden-amber)]/20 text-[var(--golden-amber-dark)] px-2 py-1 rounded text-xs font-medium">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-[var(--font-serif)] text-[var(--forest-green)] mb-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-[var(--forest-green-light)] transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      <p className="text-[var(--foreground-muted)] mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Read More */}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-[var(--golden-amber-dark)] font-semibold hover:gap-3 transition-all"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* CTA */}
              <div className="bg-[var(--forest-green)] rounded-xl p-6 text-white mb-6">
                <h3 className="font-[var(--font-serif)] text-xl mb-2">
                  Need a Fence?
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  Get a free estimate from Valdosta&apos;s trusted fence experts.
                </p>
                <CTAButton href="/free-estimate" variant="primary" fullWidth>
                  Schedule Estimate
                </CTAButton>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-xl p-6 border border-[var(--border)] mb-6">
                <h3 className="font-[var(--font-serif)] text-lg text-[var(--forest-green)] mb-4">
                  Categories
                </h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <span className="flex items-center justify-between p-2 hover:bg-[var(--background-alt)] rounded-lg transition-colors cursor-pointer">
                        <span className="text-[var(--foreground)]">{category}</span>
                        <span className="text-xs text-[var(--foreground-muted)] bg-[var(--background-alt)] px-2 py-1 rounded">
                          {blogPosts.filter((p) => p.category === category).length}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Posts */}
              <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
                <h3 className="font-[var(--font-serif)] text-lg text-[var(--forest-green)] mb-4">
                  Popular Posts
                </h3>
                <ul className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block hover:text-[var(--golden-amber-dark)] transition-colors"
                      >
                        <span className="text-sm font-medium text-[var(--foreground)] line-clamp-2">
                          {post.title}
                        </span>
                        <span className="text-xs text-[var(--foreground-muted)] mt-1 block">
                          {post.readTime}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


