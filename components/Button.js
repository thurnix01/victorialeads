export function Button({ as: Tag = "button", variant = "primary", className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold tracking-wide transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sea/40 disabled:opacity-60 disabled:cursor-not-allowed";

  const styles = {
    primary: "bg-sea text-white hover:bg-sea-bright",
    secondary: "bg-transparent text-ink ring-1 ring-ink/20 hover:bg-ink hover:text-white hover:ring-ink",
    light: "bg-white text-ink hover:bg-fog",
    ghost: "bg-transparent text-ink/80 hover:text-ink hover:bg-fog",
    signal: "bg-signal text-ink hover:brightness-110",
  };

  return <Tag className={[base, styles[variant] || styles.primary, className].join(" ")} {...props} />;
}
