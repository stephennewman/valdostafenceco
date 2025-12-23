import CTAButton from "./CTAButton";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
    trackingLabel?: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
    trackingLabel?: string;
  };
  backgroundImage?: string;
  overlay?: boolean;
  centered?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function HeroSection({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  size = "lg",
  centered = true,
}: HeroSectionProps) {
  const heights = {
    sm: "py-20 lg:py-28",
    md: "py-28 lg:py-36",
    lg: "py-32 lg:py-44",
  };

  const hasBackgroundImage = !!backgroundImage;

  return (
    <section className={`relative ${heights[size]} overflow-hidden ${hasBackgroundImage ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Background Image */}
      {hasBackgroundImage ? (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </>
      ) : (
        <>
          {/* Background with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--background-alt)] to-white" />
          
          {/* Decorative circle element - inspired by Redfern logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px]">
            <div className="absolute inset-0 rounded-full border-2 border-[var(--charcoal)]/10" />
            <div className="absolute inset-4 rounded-full border border-[var(--charcoal)]/5" />
          </div>
        </>
      )}

      {/* Accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--red)] to-transparent opacity-60" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
          {subtitle && (
            <div className="inline-flex items-center gap-3 mb-6">
              <span className={`w-12 h-px ${hasBackgroundImage ? 'bg-white/60' : 'bg-[var(--red)]'}`} />
              <span className={`font-semibold text-sm uppercase tracking-[0.15em] ${hasBackgroundImage ? 'text-white' : 'text-[var(--red)]'}`}>
                {subtitle}
              </span>
              <span className={`w-12 h-px ${hasBackgroundImage ? 'bg-white/60' : 'bg-[var(--red)]'}`} />
            </div>
          )}

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-[var(--font-serif)] mb-6 leading-[1.1] tracking-tight ${hasBackgroundImage ? 'text-white' : 'text-[var(--charcoal-dark)]'}`}>
            {title}
          </h1>

          {description && (
            <p className={`text-lg sm:text-xl mb-10 leading-relaxed max-w-2xl mx-auto ${hasBackgroundImage ? 'text-white/90' : 'text-[var(--gray)]'}`}>
              {description}
            </p>
          )}

          {(primaryCTA || secondaryCTA) && (
            <div
              className={`flex flex-col sm:flex-row gap-4 ${
                centered ? "justify-center" : ""
              }`}
            >
              {primaryCTA && (
                <CTAButton href={primaryCTA.href} variant="primary" size="lg" trackingLabel={primaryCTA.trackingLabel}>
                  {primaryCTA.text}
                </CTAButton>
              )}
              {secondaryCTA && (
                <CTAButton href={secondaryCTA.href} variant="outline" size="lg" trackingLabel={secondaryCTA.trackingLabel}>
                  {secondaryCTA.text}
                </CTAButton>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom red accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--red)]" />
    </section>
  );
}
