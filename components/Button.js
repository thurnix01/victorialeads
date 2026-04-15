export function Button({ as: Tag = "button", variant = "primary", className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/30 disabled:opacity-60 disabled:cursor-not-allowed";

  const styles = {
    primary: "bg-teal-700 text-white shadow-md shadow-teal-900/10 hover:bg-teal-800",
    secondary: "bg-white text-brand-900 ring-1 ring-slate-200/90 shadow-sm hover:bg-teal-50/60 hover:ring-teal-200/80",
    ghost: "bg-transparent text-brand-900 hover:bg-slate-100",
  };

  return <Tag className={[base, styles[variant] || styles.primary, className].join(" ")} {...props} />;
}

