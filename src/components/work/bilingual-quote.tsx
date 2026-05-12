import type { ProjectTestimonial } from "@/lib/content";

export function BilingualQuote({ testimonial }: { testimonial: ProjectTestimonial }) {
  return (
    <figure className="border-l-2 border-accent-500/40 pl-6 py-2 my-8">
      <blockquote className="text-lg md:text-xl font-medium leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      {testimonial.quoteOriginal && (
        <p className="mt-3 text-sm italic text-[var(--muted)] leading-relaxed">
          &ldquo;{testimonial.quoteOriginal}&rdquo;
        </p>
      )}
      <figcaption className="mt-4 text-xs text-[var(--muted)]">
        — <span className="text-[var(--foreground)] font-medium">{testimonial.author}</span>
        {testimonial.role ? ` · ${testimonial.role}` : ""}
      </figcaption>
    </figure>
  );
}
