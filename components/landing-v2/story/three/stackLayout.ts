/* The stack drawing's layout, with no three.js, so code outside the
   scene's chunk can read it. The scene frames itself with it. */

export const SIDE = 3;
export const THICK = 0.3;
export const GAP_SHUT = 0.04;
// the least open gap: a narrow box opens the stack wider, so its labels keep their pitch
export const GAP_OPEN = 0.7;
export const LIFT = 0.24;
export const PLATE_Y = -0.62;
export const PLATE_T = 0.08;
export const PLATE = SIDE + 1.8;

// the camera sits at target + VIEW. On screen, right is (1, 0, -1) / sqrt 2
// and up is (-UP_XZ, UP_Y, -UP_XZ)
export const VIEW: [number, number, number] = [10, 8.2, 10];
const VIEW_LEN = Math.hypot(...VIEW);
export const UP_Y = Math.hypot(VIEW[0], VIEW[2]) / VIEW_LEN;
const UP_XZ = VIEW[1] / VIEW_LEN / Math.SQRT2;

// the label column in px (pl-3, the w-12 rule, gap-3, the w-56 text) plus air at the box edge
const LABEL_PX = 12 + 48 + 12 + 224 + 8;
// a label is two lines, about 54 px tall; open, the labels sit LABEL_PITCH px apart
export const LABEL_H = 54;
export const LABEL_PITCH = 64;
// air around the drawing, in units
const MARGIN = 0.25;

// screen extents in units from the origin: across, the plate's left corner
// and the layers' right corner (where the labels hang); up, the plate's
// front corner (lowest) and the top layer's back corner, lifted (highest)
const PLATE_R = PLATE / Math.SQRT2;
const ANCHOR_R = SIDE / Math.SQRT2;
const BOTTOM_U = -UP_XZ * PLATE + UP_Y * (PLATE_Y - PLATE_T / 2);
const topU = (count: number, gap: number) => UP_XZ * SIDE + UP_Y * ((count - 1) * (THICK + gap) + THICK / 2 + LIFT);

export interface Framing {
  zoom: number;
  /** the open gap for this box */
  gap: number;
  target: [number, number, number];
}

/** fit the whole plate, and the labels when there are any, in a box of width x height px */
export function frameFor(width: number, height: number, count: number, labels: boolean): Framing {
  // the drawing's height in units, with its margin, at an open gap
  const tall = (gap: number) => topU(count, gap) - BOTTOM_U + 2 * MARGIN;
  const wide = PLATE_R + MARGIN + (labels ? ANCHOR_R : PLATE_R + MARGIN);
  const room = labels ? width - LABEL_PX : width;
  let zoom = Math.min(room / wide, height / tall(GAP_OPEN));
  // the labels need LABEL_PITCH px between layers: a small zoom opens the
  // gap past GAP_OPEN, and this bound keeps that taller stack in the box
  if (labels) zoom = Math.min(zoom, (height - (count - 1) * LABEL_PITCH) / tall(-THICK));
  zoom = Math.max(zoom, 1);
  const gap = labels ? Math.max(GAP_OPEN, LABEL_PITCH / (UP_Y * zoom) - THICK) : GAP_OPEN;
  // across: spare px split evenly at the two ends; alone, the plate is centered
  const spare = room - wide * zoom;
  const right = labels ? width / (2 * zoom) - (PLATE_R + MARGIN) - spare / (2 * zoom) : 0;
  // up: halfway between the lowest and the highest point
  const up = (topU(count, gap) + BOTTOM_U) / 2;
  return { zoom, gap, target: [right / Math.SQRT2, up / UP_Y, -right / Math.SQRT2] };
}
