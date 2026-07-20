export interface ClickPoint {
  x: number;
  y: number;
}

export interface PanelCoords {
  top: number;
  left: number;
  width: number;
}

const VIEWPORT_PADDING = 12;
const MOBILE_BOTTOM_INSET = 76;

export function getPopoverWidth(maxWidth: number) {
  return Math.min(maxWidth, window.innerWidth - VIEWPORT_PADDING * 2);
}

export function clampPopoverCoords(
  clickPoint: ClickPoint,
  panel: HTMLElement,
  maxWidth: number,
): PanelCoords {
  const panelRect = panel.getBoundingClientRect();
  const width = getPopoverWidth(maxWidth);
  const bottomInset = window.innerWidth < 768 ? MOBILE_BOTTOM_INSET : 0;

  let left = clickPoint.x - width / 2;
  let top = clickPoint.y - 28;

  left = Math.max(VIEWPORT_PADDING, Math.min(left, window.innerWidth - width - VIEWPORT_PADDING));
  top = Math.max(
    VIEWPORT_PADDING,
    Math.min(top, window.innerHeight - panelRect.height - VIEWPORT_PADDING - bottomInset),
  );

  return { top, left, width };
}
