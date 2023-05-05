export const defaultConfig = {
  automaticRearrangeAfterDropNode: false,
  collapsible: false,
  directed: true,
  focusAnimationDuration: 0.75,
  focusZoom: 1,
  freezeAllDragEvents: false,
  height: 400,
  highlightDegree: 1,
  highlightOpacity: 1,
  linkHighlightBehavior: false,
  maxZoom: 8,
  minZoom: 0.1,
  nodeHighlightBehavior: false,
  panAndZoom: false,
  staticGraph: false,
  staticGraphWithDragAndDrop: true, // tricky property
  width: 800,
  d3: {
    alphaTarget: 0.05,
    gravity: -100,
    linkLength: 100,
    linkStrength: 1,
    disableLinkForce: true,
  },
  node: {
    color: '#F3F4F6',
    fontColor: 'black',
    fontSize: 8,
    fontWeight: 'normal',
    highlightColor: 'SAME',
    highlightFontSize: 8,
    highlightFontWeight: 'normal',
    highlightStrokeColor: 'SAME',
    highlightStrokeWidth: 'SAME',
    labelProperty: 'name',
    mouseCursor: 'pointer',
    opacity: 1,
    renderLabel: true,
    size: 150,
    strokeColor: '#9CA3AF',
    strokeWidth: 1,
    svg: '',
    symbolType: 'circle',
  },
  link: {
    color: '#9CA3AF',
    fontColor: 'black',
    fontSize: 8,
    fontWeight: 'normal',
    highlightColor: 'SAME',
    highlightFontSize: 8,
    highlightFontWeight: 'normal',
    labelProperty: 'name',
    mouseCursor: 'pointer',
    opacity: 1,
    renderLabel: true,
    semanticStrokeWidth: false,
    strokeWidth: 1.5,
    markerHeight: 6,
    markerWidth: 6,
    strokeDasharray: 0,
    strokeDashoffset: 0,
    strokeLinecap: 'butt',
  },
};