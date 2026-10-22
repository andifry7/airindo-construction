export default function SectionHeading({ eyebrow, title, description, align = "center", titleClass = "text-brand-ink" }) {
  const alignment = align === "center" ? "mx-auto max-w-2xl text-center" : "text-left";
  return (
    <div className={alignment}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`mt-3 text-[28px] font-extrabold leading-tight sm:text-[32px] ${titleClass}`}>{title}</h2>
      {description && <p className="mt-4 text-[15px] leading-relaxed text-brand-muted">{description}</p>}
    </div>
  );
}
