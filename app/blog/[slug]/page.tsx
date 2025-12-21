import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Share2, Phone } from "lucide-react";
import HeroSection from "../../components/HeroSection";
import CTAButton from "../../components/CTAButton";
import {
  blogPosts,
  getBlogPostBySlug,
  getAllBlogSlugs,
  getRecentPosts,
} from "../../data/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const recentPosts = getRecentPosts(3).filter((p) => p.slug !== slug);

  // Simple markdown-like rendering for the content
  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    const elements: React.ReactNode[] = [];
    let inList = false;
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={elements.length} className="list-disc pl-6 mb-6 space-y-2">
            {listItems.map((item, i) => (
              <li key={i} className="text-[var(--foreground-muted)]">
                {item}
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }
      inList = false;
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Headers
      if (trimmedLine.startsWith("## ")) {
        flushList();
        elements.push(
          <h2
            key={index}
            className="text-2xl font-[var(--font-serif)] text-[var(--forest-green)] mt-8 mb-4"
          >
            {trimmedLine.replace("## ", "")}
          </h2>
        );
      } else if (trimmedLine.startsWith("### ")) {
        flushList();
        elements.push(
          <h3
            key={index}
            className="text-xl font-[var(--font-serif)] text-[var(--forest-green)] mt-6 mb-3"
          >
            {trimmedLine.replace("### ", "")}
          </h3>
        );
      }
      // Bold lines (used as sub-headers)
      else if (trimmedLine.startsWith("**") && trimmedLine.endsWith("**")) {
        flushList();
        elements.push(
          <p
            key={index}
            className="font-semibold text-[var(--forest-green)] mt-4 mb-2"
          >
            {trimmedLine.replace(/\*\*/g, "")}
          </p>
        );
      }
      // List items
      else if (trimmedLine.startsWith("- ")) {
        inList = true;
        listItems.push(trimmedLine.replace("- ", ""));
      }
      // Regular paragraphs
      else if (trimmedLine) {
        flushList();
        // Handle inline bold
        const processedLine = trimmedLine.replace(
          /\*\*(.+?)\*\*/g,
          '<strong class="text-[var(--foreground)]">$1</strong>'
        );
        elements.push(
          <p
            key={index}
            className="text-[var(--foreground-muted)] mb-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />
        );
      }
    });

    flushList();
    return elements;
  };

  return (
    <>
      <HeroSection
        subtitle={post.category}
        title={post.title}
        size="sm"
      />

      {/* Breadcrumb */}
      <div className="bg-[var(--background-alt)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--forest-green)] transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      <section className="py-16 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-2">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--foreground-muted)] mb-8 pb-8 border-b border-[var(--border)]">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
                <button className="flex items-center gap-2 hover:text-[var(--forest-green)] transition-colors ml-auto">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>

              {/* Content */}
              <div className="prose max-w-none">
                {renderContent(post.content)}
              </div>

              {/* CTA Box */}
              <div className="mt-12 bg-[var(--forest-green)] rounded-xl p-8 text-white">
                <h3 className="font-[var(--font-serif)] text-2xl mb-2">
                  Ready for Your Fence Project?
                </h3>
                <p className="text-white/80 mb-6">
                  Get a free, no-obligation estimate from Valdosta&apos;s trusted fence
                  experts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <CTAButton href="/free-estimate" variant="primary">
                    Get Free Estimate
                  </CTAButton>
                  <a
                    href="tel:+12295551234"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    (229) 555-1234
                  </a>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* CTA Card */}
              <div className="bg-[var(--golden-amber)]/10 border border-[var(--golden-amber)]/30 rounded-xl p-6 mb-6">
                <h3 className="font-[var(--font-serif)] text-lg text-[var(--forest-green)] mb-2">
                  Free Estimates
                </h3>
                <p className="text-[var(--foreground-muted)] text-sm mb-4">
                  Get a personalized quote for your fence project – no cost, no
                  obligation.
                </p>
                <CTAButton href="/free-estimate" variant="primary" fullWidth>
                  Request Estimate
                </CTAButton>
              </div>

              {/* Related Posts */}
              {recentPosts.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
                  <h3 className="font-[var(--font-serif)] text-lg text-[var(--forest-green)] mb-4">
                    More Articles
                  </h3>
                  <ul className="space-y-4">
                    {recentPosts.map((relatedPost) => (
                      <li key={relatedPost.slug}>
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="block hover:text-[var(--golden-amber-dark)] transition-colors"
                        >
                          <span className="text-sm font-medium text-[var(--foreground)] line-clamp-2 hover:text-[var(--golden-amber-dark)]">
                            {relatedPost.title}
                          </span>
                          <span className="text-xs text-[var(--foreground-muted)] mt-1 block">
                            {relatedPost.readTime}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/blog"
                    className="block text-center text-[var(--golden-amber-dark)] text-sm mt-4 hover:underline"
                  >
                    View All Articles
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: {
              "@type": "Organization",
              name: "Valdosta Fence Co",
            },
            publisher: {
              "@type": "Organization",
              name: "Valdosta Fence Co",
            },
          }),
        }}
      />
    </>
  );
}


