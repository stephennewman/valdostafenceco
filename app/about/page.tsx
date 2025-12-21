import { Metadata } from "next";
import { Users, Award, MapPin, Heart, Shield, Clock } from "lucide-react";
import HeroSection from "../components/HeroSection";
import CTAButton from "../components/CTAButton";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Valdosta Fence Co is a local, family-owned fence company serving Valdosta, GA and surrounding areas. Learn about our commitment to quality craftsmanship and community.",
};

const values = [
  {
    icon: Heart,
    title: "Family Values",
    description:
      "We treat every customer like family. Your satisfaction isn't just business – it's personal to us.",
  },
  {
    icon: Award,
    title: "Quality First",
    description:
      "We never cut corners. Premium materials, proper techniques, and attention to detail on every project.",
  },
  {
    icon: Shield,
    title: "Honest Service",
    description:
      "Transparent pricing, realistic timelines, and honest recommendations – even if it means less profit for us.",
  },
  {
    icon: Clock,
    title: "Reliability",
    description:
      "When we say we'll be there, we're there. When we give a deadline, we meet it. Your time matters.",
  },
];

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "25mi", label: "Service Radius" },
  { value: "100%", label: "Satisfaction Goal" },
  { value: "24hr", label: "Quote Response" },
];

export default function AboutPage() {
  return (
    <>
      <HeroSection
        subtitle="About Us"
        title="Your Local Fence Experts"
        description="Family-owned, locally operated, and committed to building fences that last."
        size="md"
      />

      {/* Our Story */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-[var(--font-serif)] text-[var(--charcoal-dark)] mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-[var(--gray)]">
                <p>
                  Valdosta Fence Co started with a simple belief: homeowners and
                  businesses deserve a fence contractor they can trust. Too often,
                  we heard stories of contractors who didn&apos;t show up, cut corners,
                  or disappeared after cashing the check.
                </p>
                <p>
                  We decided to do things differently. As a family-owned business
                  rooted in Valdosta, we have a reputation to uphold – not just as a
                  company, but as members of this community. Your neighbor might be
                  our next customer, and we want them to hear good things.
                </p>
                <p>
                  That&apos;s why every fence we build is built like it&apos;s for our own
                  home. We use quality materials, proven techniques, and take the
                  time to do the job right. No shortcuts, no surprises, no excuses.
                </p>
                <p className="font-semibold text-[var(--charcoal-dark)]">
                  When you hire Valdosta Fence Co, you&apos;re not just getting a fence
                  – you&apos;re getting our word that it will be done right.
                </p>
              </div>
            </div>
            <div className="relative">
              {/* Placeholder for team/company image */}
              <div className="aspect-[4/3] bg-[var(--background-alt)] rounded-sm flex items-center justify-center border border-[var(--border)]">
                <div className="text-center p-8">
                  <Users className="w-16 h-16 text-[var(--gray)] mx-auto mb-4" />
                  <span className="text-[var(--gray)]">
                    Team Photo Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[var(--charcoal-deep)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-[var(--red)] mb-1">
                  {stat.value}
                </div>
                <div className="text-white text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-24 bg-[var(--background-alt)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-[var(--font-serif)] text-[var(--charcoal-dark)] mb-4">
              Our Values
            </h2>
            <p className="text-lg text-[var(--gray)]">
              These aren&apos;t just words on a wall – they guide every decision we
              make and every fence we build.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white p-6 rounded-sm border border-[var(--border)]"
              >
                <div className="w-12 h-12 bg-[var(--red)]/10 rounded-sm flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-[var(--red)]" />
                </div>
                <h3 className="font-[var(--font-serif)] text-lg text-[var(--charcoal-dark)] mb-2">
                  {value.title}
                </h3>
                <p className="text-[var(--gray)] text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Local Matters */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-square max-w-md mx-auto bg-[var(--charcoal)]/5 rounded-full flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-[var(--charcoal)]/10 rounded-full flex items-center justify-center">
                  <div className="w-1/2 h-1/2 bg-[var(--red)] rounded-full flex items-center justify-center shadow-lg">
                    <MapPin className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl font-[var(--font-serif)] text-[var(--charcoal-dark)] mb-6">
                Why Local Matters
              </h2>
              <div className="space-y-4 text-[var(--gray)]">
                <p>
                  When you hire a local, family-owned company, your money stays in
                  the community. But that&apos;s not the only benefit.
                </p>
                <p>
                  <strong className="text-[var(--charcoal-dark)]">
                    We know this area.
                  </strong>{" "}
                  We understand South Georgia&apos;s soil conditions, weather patterns,
                  and building codes. We know which materials hold up best in our
                  humid summers and occasional storms.
                </p>
                <p>
                  <strong className="text-[var(--charcoal-dark)]">
                    We&apos;re accountable.
                  </strong>{" "}
                  If something goes wrong, you know where to find us. We&apos;re not
                  going anywhere. Our reputation in this community matters to us.
                </p>
                <p>
                  <strong className="text-[var(--charcoal-dark)]">
                    We care personally.
                  </strong>{" "}
                  You might run into us at Publix or at a VSU game. That personal
                  connection means we&apos;ll always do right by you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-[var(--charcoal-deep)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-[var(--font-serif)] text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Experience the Valdosta Fence Co difference. Get a free estimate and
            see why your neighbors trust us with their fencing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href="/free-estimate" variant="primary" size="lg">
              Get Free Estimate
            </CTAButton>
            <CTAButton href="/reviews" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
              Read Customer Reviews
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
