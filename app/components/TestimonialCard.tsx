import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  location: string;
  rating: number;
  text: string;
  service?: string;
}

export default function TestimonialCard({
  name,
  location,
  rating,
  text,
  service,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-sm p-6 border border-[var(--border)] h-full flex flex-col">
      {/* Quote Icon */}
      <div className="mb-4">
        <Quote className="w-8 h-8 text-[var(--red)]/30" />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? "text-[var(--red)] fill-[var(--red)]"
                : "text-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-[var(--charcoal)] text-sm mb-6 flex-grow leading-relaxed">
        &ldquo;{text}&rdquo;
      </p>

      {/* Author */}
      <div className="border-t border-[var(--border)] pt-4">
        <p className="font-semibold text-[var(--charcoal-dark)] text-sm">{name}</p>
        <p className="text-xs text-[var(--gray)]">{location}</p>
        {service && (
          <p className="text-xs text-[var(--red)] mt-1">
            {service}
          </p>
        )}
      </div>
    </div>
  );
}
