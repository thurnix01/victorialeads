import { useInView } from "@/lib/useInView";

export function AnimatedSection({ as: Tag = "section", className = "", children, ...props }) {
  const { ref, isInView } = useInView();

  return (
    <Tag
      ref={ref}
      {...props}
      className={[
        "transition-all duration-700 ease-out will-change-transform",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}

