import geo from "@/lib/victoriaZonesGeo.json";

/**
 * Greater Victoria municipal densities — real CRD census subdivision boundaries
 * (BC OpenMaps / Statistics Canada 2021 CSD), projected for SVG.
 *
 * Counts = employer business locations (BC Stats Business Register).
 * Source boundaries: openmaps.gov.bc.ca CEN_CENSUS_SUBDIVSIONS_SVW
 * Counts: catalogue.data.gov.bc.ca/dataset/number-of-businesses
 */
export const ZONE_DATA_NOTE =
  "Outlines from Statistics Canada 2021 census subdivisions (CRD municipalities + Cowichan Valley A/B/C for Malahat, Shawnigan Lake, Mill Bay). Counts are employer business locations (BC Stats)—all industries, used as a density signal.";

export const MAP_VIEW_BOX = geo.viewBox;

export const VICTORIA_ZONES = geo.zones;

const max = Math.max(...VICTORIA_ZONES.map((z) => z.employers));

/** Duo-tone fill: light fog → deep sea by density */
export function zoneFill(employers, hovered, selected) {
  if (hovered || selected) return "#21867b";
  const t = Math.sqrt(employers / max);
  const r = Math.round(232 + (26 - 232) * t);
  const g = Math.round(238 + (107 - 238) * t);
  const b = Math.round(242 + (98 - 242) * t);
  return `rgb(${r},${g},${b})`;
}

export function formatCount(n) {
  return n.toLocaleString("en-CA");
}
