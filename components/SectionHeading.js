export function SectionHeading({ eyebrow, title, subtitle, align = "left" }) {
  const alignClasses = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={["max-w-2xl", alignClasses].join(" ")}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">{eyebrow}</p>
      ) : null}
      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-base leading-relaxed text-ink/65">{subtitle}</p> : null}
    </div>
  );
}
