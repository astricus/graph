import { createSelector } from 'reselect';

export const selectSettings = (state) => state.settings;

export const selectZoom = createSelector(
  [selectSettings],
  (settings) => settings.zoom
);

export const selectHop = createSelector(
  [selectSettings],
  (settings) => settings.hop
);

export const selectDefinitionsNumber = createSelector(
  [selectSettings],
  (settings) => settings.definitionsNumber
);

export const selectAbstractType = createSelector(
  [selectSettings],
  (settings) => settings.abstractType
);

export const selectShowStereotype = createSelector(
  [selectSettings],
  (settings) => settings.showStereotype
);

export const selectShowColor = createSelector(
  [selectSettings],
  (settings) => settings.showColor
);

export const selectSelectionColor = createSelector(
  [selectSettings],
  (settings) => settings.selectionColor
);
