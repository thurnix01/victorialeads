export function SectionHeading({ eyebrow, title, subtitle, align = "left" }) {
  const alignClasses = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={["max-w-2xl", alignClasses].join(" ")}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-slate-600 leading-relaxed">{subtitle}</p> : null}
    </div>
  );
}

