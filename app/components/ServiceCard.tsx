import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export default function ServiceCard({
  title,
  description,
  href,
  icon: Icon,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-white rounded-sm p-6 border border-[var(--border)] hover:border-[var(--red)]/30 hover:shadow-lg transition-all duration-300"
    >
      <div className="w-12 h-12 bg-[var(--background-alt)] rounded-sm flex items-center justify-center mb-4 group-hover:bg-[var(--red)]/10 transition-colors">
        <Icon className="w-6 h-6 text-[var(--charcoal)] group-hover:text-[var(--red)] transition-colors" />
      </div>

      <h3 className="text-lg font-[var(--font-serif)] text-[var(--charcoal-dark)] mb-2 group-hover:text-[var(--red)] transition-colors">
        {title}
      </h3>

      <p className="text-[var(--gray)] text-sm mb-4 line-clamp-2">
        {description}
      </p>

      <span className="inline-flex items-center gap-2 text-[var(--red)] font-medium text-sm group-hover:gap-3 transition-all">
        Learn More
        <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  );
}
