/**
 * Greater Victoria zone densities for the interactive map.
 * Counts = employer business locations (BC Stats / Business Register, Dec 2025 file).
 * Not trades-only — density proxy for how crowded each market is.
 * Source: https://catalogue.data.gov.bc.ca/dataset/number-of-businesses
 */
export const ZONE_DATA_NOTE =
  "Employer business locations by municipality (BC Stats, Business Register). Includes all industries—used as a density signal, not a trades-only directory.";

export const VICTORIA_ZONES = [
  {
    id: "victoria",
    name: "Victoria",
    employers: 5185,
    path: "M420 470 L455 455 L500 460 L535 480 L545 520 L530 560 L490 575 L455 565 L430 540 L415 505 Z",
    label: { x: 475, y: 520 },
  },
  {
    id: "oak-bay",
    name: "Oak Bay",
    employers: 784,
    path: "M535 480 L575 470 L595 500 L590 545 L560 560 L530 560 L545 520 Z",
    label: { x: 565, y: 515 },
  },
  {
    id: "esquimalt",
    name: "Esquimalt",
    employers: 377,
    path: "M365 470 L420 470 L415 505 L400 525 L360 520 L345 495 Z",
    label: { x: 380, y: 500 },
  },
  {
    id: "view-royal",
    name: "View Royal",
    employers: 284,
    path: "M330 420 L380 415 L400 450 L365 470 L345 450 Z",
    label: { x: 360, y: 445 },
  },
  {
    id: "saanich",
    name: "Saanich",
    employers: 3890,
    path: "M400 280 L480 270 L520 300 L535 360 L520 420 L480 455 L420 470 L380 415 L390 350 Z",
    label: { x: 455, y: 370 },
  },
  {
    id: "central-saanich",
    name: "Central Saanich",
    employers: 762,
    path: "M455 200 L520 195 L545 230 L535 280 L480 270 L455 240 Z",
    label: { x: 495, y: 240 },
  },
  {
    id: "north-saanich",
    name: "North Saanich",
    employers: 464,
    path: "M470 110 L540 100 L565 140 L545 185 L490 195 L460 160 Z",
    label: { x: 510, y: 150 },
  },
  {
    id: "sidney",
    name: "Sidney",
    employers: 590,
    path: "M540 100 L585 95 L600 130 L575 155 L545 145 Z",
    label: { x: 570, y: 125 },
  },
  {
    id: "langford",
    name: "Langford",
    employers: 1497,
    path: "M220 380 L310 360 L330 420 L300 460 L240 470 L200 430 Z",
    label: { x: 260, y: 420 },
  },
  {
    id: "colwood",
    name: "Colwood",
    employers: 480,
    path: "M240 470 L300 460 L320 500 L290 535 L245 520 Z",
    label: { x: 275, y: 500 },
  },
  {
    id: "metchosin",
    name: "Metchosin",
    employers: 196,
    path: "M160 480 L240 470 L245 520 L220 560 L170 555 L145 515 Z",
    label: { x: 195, y: 520 },
  },
  {
    id: "highlands",
    name: "Highlands",
    employers: 92,
    path: "M280 300 L350 290 L380 350 L330 420 L310 360 L270 340 Z",
    label: { x: 320, y: 350 },
  },
  {
    id: "sooke",
    name: "Sooke",
    employers: 418,
    path: "M40 420 L160 400 L180 460 L145 515 L80 530 L30 480 Z",
    label: { x: 100, y: 465 },
  },
  {
    id: "shawnigan",
    name: "Shawnigan Lake",
    employers: 303,
    note: "Cowichan Valley B (approx.)",
    path: "M250 40 L340 50 L350 120 L300 160 L240 140 L220 80 Z",
    label: { x: 285, y: 95 },
  },
  {
    id: "malahat",
    name: "Malahat",
    employers: 189,
    note: "Cowichan Valley A (approx.)",
    path: "M200 140 L270 150 L280 220 L240 260 L190 240 L175 180 Z",
    label: { x: 230, y: 195 },
  },
  {
    id: "mill-bay",
    name: "Mill Bay",
    employers: 201,
    note: "Cowichan Valley C (approx.)",
    path: "M340 50 L410 60 L420 120 L370 150 L350 120 Z",
    label: { x: 380, y: 100 },
  },
];

const max = Math.max(...VICTORIA_ZONES.map((z) => z.employers));

/** Duo-tone fill: light fog → deep sea by density */
export function zoneFill(employers, hovered, selected) {
  if (hovered || selected) return "#21867b"; // sea-bright
  const t = Math.sqrt(employers / max);
  // blend paper-fog to sea
  const stops = [
    [232, 238, 242], // fog
    [26, 107, 98], // sea
  ];
  const r = Math.round(stops[0][0] + (stops[1][0] - stops[0][0]) * t);
  const g = Math.round(stops[0][1] + (stops[1][1] - stops[0][1]) * t);
  const b = Math.round(stops[0][2] + (stops[1][2] - stops[0][2]) * t);
  return `rgb(${r},${g},${b})`;
}

export function formatCount(n) {
  return n.toLocaleString("en-CA");
}
