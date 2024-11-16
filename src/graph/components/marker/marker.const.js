const HIGHLIGHTED = "H";
const MARKER_SMALL_SIZE = 16;
const MARKER_MEDIUM_OFFSET = 2;
const MARKER_LARGE_OFFSET = 4;
// internal marker flavors for cross referencing
const MARKERS = {
  MARKER_S: "marker-small",
  MARKER_SH: "marker-small-highlighted",
  MARKER_M: "marker-medium",
  MARKER_MH: "marker-medium-highlighted",
  MARKER_L: "marker-large",
  MARKER_LH: "marker-large-highlighted",
  MARKER_S_I: "marker-small-reverse",
  MARKER_SH_I: "marker-small-highlighted-reverse",
  MARKER_M_I: "marker-medium-reverse",
  MARKER_MH_I: "marker-medium-highlighted-reverse",
  MARKER_L_I: "marker-large-reverse",
  MARKER_LH_I: "marker-large-highlighted-reverse",
};
// hard coded aggregation of the different sizes available for markers
const SIZES = {
  S: "S",
  M: "M",
  L: "L",
};

export { HIGHLIGHTED, MARKER_LARGE_OFFSET, MARKER_MEDIUM_OFFSET, MARKER_SMALL_SIZE, MARKERS, SIZES };
