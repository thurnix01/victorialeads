export function Button({ as: Tag = "button", variant = "primary", className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 disabled:opacity-60 disabled:cursor-not-allowed";

  const styles = {
    primary: "bg-slate-900 text-white shadow-sm hover:bg-slate-800",
    secondary: "bg-white text-slate-900 ring-1 ring-slate-200 shadow-sm hover:bg-slate-50",
    ghost: "bg-transparent text-slate-900 hover:bg-slate-100",
  };

  return <Tag className={[base, styles[variant] || styles.primary, className].join(" ")} {...props} />;
}

