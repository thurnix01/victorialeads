export function CheckIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={["h-5 w-5", className].join(" ")}>
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 01.006 1.414l-7.1 7.2a1 1 0 01-1.43-.002L3.29 9.01a1 1 0 011.415-1.414l3.18 3.182 6.39-6.488a1 1 0 011.43 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function StarIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={["h-4 w-4", className].join(" ")}>
      <path d="M9.049 2.927a1 1 0 011.902 0l1.286 3.96a1 1 0 00.95.69h4.162a1 1 0 01.592 1.806l-3.367 2.445a1 1 0 00-.364 1.118l1.286 3.96a1 1 0 01-1.538 1.118l-3.367-2.445a1 1 0 00-1.176 0l-3.367 2.445A1 1 0 014.504 16.9l1.286-3.96a1 1 0 00-.364-1.118L2.06 9.383a1 1 0 01.592-1.806h4.162a1 1 0 00.95-.69l1.286-3.96z" />
    </svg>
  );
}

export function BoltIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={["h-5 w-5", className].join(" ")}>
      <path d="M11.3 1.046a1 1 0 00-1.72.5L8.2 7H4.5a1 1 0 00-.8 1.6l6.2 8.2a1 1 0 001.72-.5L12.8 11h3.7a1 1 0 00.8-1.6l-6-8.354z" />
    </svg>
  );
}

export function TargetIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={["h-5 w-5", className].join(" ")}>
      <path
        fillRule="evenodd"
        d="M10 2a8 8 0 107.446 5.043 1 1 0 01-1.856.75A6 6 0 1110 4a1 1 0 010-2zm0 4a4 4 0 104 4 1 1 0 112 0 6 6 0 11-6-6 1 1 0 010 2zm0 3a1 1 0 100 2 1 1 0 000-2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ChartIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={["h-5 w-5", className].join(" ")}>
      <path d="M3 3a1 1 0 012 0v14a1 1 0 01-2 0V3zm6 6a1 1 0 012 0v8a1 1 0 01-2 0V9zm6-4a1 1 0 012 0v12a1 1 0 01-2 0V5z" />
    </svg>
  );
}

