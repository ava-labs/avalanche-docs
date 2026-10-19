"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import {
  BoxGeometry,
  Color,
  EdgesGeometry,
  MathUtils,
  PlaneGeometry,
  type BufferGeometry,
  type Group,
  type LineBasicMaterial,
  type Mesh,
  type MeshBasicMaterial,
} from "three";
import type { MotionValue } from "framer-motion";
import { CAPTION, MONO } from "../kit";
import { plateNameCap, usePlateName } from "./logos";
import { PALETTE, shadedBox, type SceneTheme } from "./palette";
import type { SceneProps } from "./SceneFrame";

/* Your L1 as an exploded drawing: the layers a team sets, stacked over the
   P-Chain plate every L1 registers on. Once the box is on screen the layers
   drop in, bottom first; the stack then opens as the drawing scrolls up, so
   each layer reads on its own. The validator set is red at rest; the layer
   the reader points at lifts and takes the red. Once the drop has played,
   the scene draws only when something moves. The plate's rim carries its
   name. */

export interface StackLayer {
  key: string;
  label: string;
  line: string;
}

export interface StackSceneProps {
  layers: StackLayer[];
  /** index of the lit layer, or null */
  active: number | null;
  /** 0 = assembled, 1 = fully open */
  spread: MotionValue<number>;
  /** the reader points at a layer in the drawing, or leaves it */
  onPoint?: (index: number | null) => void;
  /** false draws the stack alone, centered (the narrow still) */
  labels?: boolean;
  /** false holds the drop, so it plays as the drawing is revealed, not before */
  play?: boolean;
}

const SIDE = 3;
const THICK = 0.3;
const GAP_SHUT = 0.04;
// the least open gap: a narrow box opens the stack wider, so its labels keep their pitch
const GAP_OPEN = 0.7;
const LIFT = 0.24;
const PLATE_Y = -0.62;
const PLATE_T = 0.08;
const PLATE = SIDE + 1.8;
// the drop: each layer falls this far onto the one below, bottom first; low
// enough that an open stack never leaves the frame as it falls
const FALL = 1.4;
const DROP_S = 0.75;
const DROP_STAGGER_S = 0.12;
// the plate's grid stops one 0.4 cell in from its edge: the rim between holds the plate's name
const GRID = PLATE - 0.8;
const RIM = (PLATE - GRID) / 2;
// the name's capital height on screen, px, and at most this share of the rim,
// so the letters stay clear of the rim's hairline
const NAME_CAP_PX = 8;
const NAME_FILL = 0.75;
// the scene reports ready without the name after this long
const READY_WAIT_MS = 3000;

// the camera sits at target + VIEW. On screen, right is (1, 0, -1) / sqrt 2
// and up is (-UP_XZ, UP_Y, -UP_XZ)
const VIEW: [number, number, number] = [10, 8.2, 10];
const VIEW_LEN = Math.hypot(...VIEW);
const UP_Y = Math.hypot(VIEW[0], VIEW[2]) / VIEW_LEN;
const UP_XZ = VIEW[1] / VIEW_LEN / Math.SQRT2;

// the label column in px (pl-3, the w-12 rule, gap-3, the w-56 text) plus air at the box edge
const LABEL_PX = 12 + 48 + 12 + 224 + 8;
// a label is two lines, about 54 px tall; open, the labels sit LABEL_PITCH px apart
const LABEL_H = 54;
const LABEL_PITCH = 64;
// air around the drawing, in units
const MARGIN = 0.25;

// screen extents in units from the origin: across, the plate's left corner
// and the layers' right corner (where the labels hang); up, the plate's
// front corner (lowest) and the top layer's back corner, lifted (highest)
const PLATE_R = PLATE / Math.SQRT2;
const ANCHOR_R = SIDE / Math.SQRT2;
const BOTTOM_U = -UP_XZ * PLATE + UP_Y * (PLATE_Y - PLATE_T / 2);
const topU = (count: number, gap: number) => UP_XZ * SIDE + UP_Y * ((count - 1) * (THICK + gap) + THICK / 2 + LIFT);

interface Framing {
  zoom: number;
  /** the open gap for this box */
  gap: number;
  target: [number, number, number];
}

/** fit the whole plate, and the labels when there are any, in a box of width x height px */
function frameFor(width: number, height: number, count: number, labels: boolean): Framing {
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

/** what the frame callbacks read; one object per scene, written in place */
interface Shared {
  /** the scene's own clock, s: it counts only while the box is on screen */
  time: number;
  running: boolean;
  /** the drop has played */
  landed: boolean;
  active: number | null;
  spread: MotionValue<number>;
  gap: number;
}

interface Geometry {
  layer: BufferGeometry;
  edges: BufferGeometry;
  /** a plain layer box: the hover target */
  box: BufferGeometry;
  plate: BufferGeometry;
  plateEdges: BufferGeometry;
}

function useGeometry(theme: SceneTheme): Geometry {
  const geometry = useMemo(() => {
    const box = new BoxGeometry(SIDE, THICK, SIDE);
    const plateBox = new BoxGeometry(PLATE, PLATE_T, PLATE);
    const plateEdges = new EdgesGeometry(plateBox);
    plateBox.dispose();
    return {
      layer: shadedBox(theme, SIDE, THICK, SIDE),
      edges: new EdgesGeometry(box),
      box,
      plate: shadedBox(theme, PLATE, PLATE_T, PLATE),
      plateEdges,
    };
  }, [theme]);
  // the GPU holds a geometry's buffers until it is disposed
  useEffect(() => () => Object.values(geometry).forEach((g: BufferGeometry) => g.dispose()), [geometry]);
  return geometry;
}

/** first in every frame: advance the scene's clock, and tell when the drop is over */
function Tick({ shared, end, onLanded }: { shared: Shared; end: number; onLanded: () => void }) {
  useFrame((_, dt) => {
    if (shared.running) shared.time += Math.min(dt, 0.1);
    if (!shared.landed && shared.time >= end) {
      shared.landed = true;
      onLanded();
    }
  }, -2);
  return null;
}

/** call onReady once the first frame with the plate's name (`when`) is on the canvas */
function Ready({ when, onReady }: { when: boolean; onReady: () => void }) {
  const done = useRef(false);
  const invalidate = useThree((s) => s.invalidate);
  // a paused scene draws once more, so that frame is the one reported
  useEffect(() => {
    if (when) invalidate();
  }, [when, invalidate]);
  useFrame(() => {
    if (done.current || !when) return;
    done.current = true;
    // the frame is drawn after the callbacks; the next animation frame has it on screen
    requestAnimationFrame(() => onReady());
  });
  return null;
}

/** on demand, ask for a frame when an input changes: none of these ask on their own */
function Kick({ spread, active, running }: { spread: MotionValue<number>; active: number | null; running: boolean }) {
  const gl = useThree((s) => s.gl);
  const invalidate = useThree((s) => s.invalidate);
  const pointer = useThree((s) => s.pointer);
  useEffect(() => {
    const el = gl.domElement;
    const kick = () => invalidate();
    // the pointer turns the rig; R3F only records it
    el.addEventListener("pointermove", kick);
    // R3F keeps the last pointer when it leaves: center it, so the rig turns back to rest
    const leave = () => {
      pointer.set(0, 0);
      invalidate();
    };
    el.addEventListener("pointerleave", leave);
    const off = spread.on("change", kick);
    return () => {
      el.removeEventListener("pointermove", kick);
      el.removeEventListener("pointerleave", leave);
      off();
    };
  }, [gl, invalidate, spread, pointer]);
  useEffect(() => invalidate(), [active, running, invalidate]);
  return null;
}

function Layer({
  index,
  layer,
  shared,
  geometry,
  theme,
  onPoint,
  labels,
}: {
  index: number;
  layer: StackLayer;
  shared: Shared;
  geometry: Geometry;
  theme: SceneTheme;
  onPoint?: (index: number | null) => void;
  labels: boolean;
}) {
  const rest = useRef<Group>(null);
  const lift = useRef<Group>(null);
  const mat = useRef<MeshBasicMaterial>(null);
  const line = useRef<LineBasicMaterial>(null);
  const tag = useRef<HTMLDivElement>(null);
  const rule = useRef<HTMLSpanElement>(null);
  const palette = PALETTE[theme];
  const tones = useMemo(
    () => ({
      face: new Color(palette.face),
      red: new Color(palette.red),
      edge: new Color(palette.edge),
      redEdge: new Color(palette.redEdge),
    }),
    [palette],
  );
  // the first frame already shows the rest pose's red
  const lit = useRef(shared.active === index ? 1 : 0);

  // before drei's Html reads the positions (priority 0), so a label never trails its layer by a frame
  useFrame((state, dt) => {
    const outer = rest.current;
    const inner = lift.current;
    if (!outer || !inner) return;
    const intro = MathUtils.clamp((shared.time - index * DROP_STAGGER_S) / DROP_S, 0, 1);
    const spread = shared.spread.get();
    const gap = MathUtils.lerp(GAP_SHUT, shared.gap, spread);
    const to = shared.active === index ? 1 : 0;
    // after an idle spell the first dt is the whole spell: clamp it, so the ease starts gently
    lit.current = MathUtils.damp(lit.current, to, 10, Math.min(dt, 1 / 30));
    if (Math.abs(lit.current - to) < 0.001) lit.current = to;
    else state.invalidate();
    outer.position.y = index * (THICK + gap) + (1 - intro) ** 3 * FALL;
    // the lift grows with the spread, so a shut stack never intersects
    inner.position.y = lit.current * LIFT * spread;
    mat.current?.color.copy(tones.face).lerp(tones.red, lit.current);
    line.current?.color.copy(tones.edge).lerp(tones.redEdge, lit.current);
    if (tag.current) {
      // a label shows once its layer has landed and the stack is open enough to hold it
      const pitch = (THICK + gap) * UP_Y * state.camera.zoom;
      const show = MathUtils.smoothstep(pitch, LABEL_H, LABEL_PITCH) * MathUtils.smoothstep(intro, 0.6, 1);
      tag.current.style.opacity = show.toFixed(3);
    }
    if (rule.current) rule.current.style.backgroundColor = lit.current > 0.5 ? palette.red : "";
  }, -1);

  return (
    <group ref={rest}>
      {/* the hover target stays at the layer's rest place: a lift never moves it out from under the pointer */}
      <mesh
        geometry={geometry.box}
        visible={false}
        onPointerOver={(e) => {
          e.stopPropagation();
          onPoint?.(index);
        }}
        onPointerOut={() => onPoint?.(null)}
      />
      <group ref={lift}>
        <mesh geometry={geometry.layer}>
          <meshBasicMaterial
            ref={mat}
            vertexColors
            color={palette.face}
            polygonOffset
            polygonOffsetFactor={1}
            polygonOffsetUnits={1}
          />
        </mesh>
        <lineSegments geometry={geometry.edges}>
          <lineBasicMaterial ref={line} color={palette.edge} />
        </lineSegments>
      </group>
      {/* the label is a sibling of the lift: it holds its place, so labels never touch */}
      {labels && (
        <Html position={[SIDE / 2, 0, -SIDE / 2]} style={{ pointerEvents: "none" }} zIndexRange={[10, 0]}>
          <div ref={tag} className="flex -translate-y-1/2 items-center gap-3 pl-3" style={{ opacity: 0 }}>
            <span ref={rule} className="h-px w-12 shrink-0 bg-zinc-300 dark:bg-zinc-700" />
            <span className="flex w-56 flex-col gap-0.5">
              <span className={`${MONO} text-zinc-900 dark:text-zinc-100`}>{layer.label}</span>
              <span className={CAPTION}>{layer.line}</span>
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}

function Plate({
  geometry,
  theme,
  name,
}: {
  geometry: Geometry;
  theme: SceneTheme;
  name: ReturnType<typeof usePlateName>;
}) {
  const palette = PALETTE[theme];
  return (
    <group position={[0, PLATE_Y, 0]}>
      <mesh geometry={geometry.plate}>
        <meshBasicMaterial
          vertexColors
          color={palette.plate}
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />
      </mesh>
      <lineSegments geometry={geometry.plateEdges}>
        <lineBasicMaterial color={palette.edge} />
      </lineSegments>
      {/* inset one 0.4 cell: a grid line on the plate's edge would fight its hairline and stipple it */}
      <gridHelper args={[GRID, 10, palette.grid, palette.grid]} position={[0, PLATE_T / 2 + 0.001, 0]} />
      {name && <PlateName name={name} theme={theme} />}
    </group>
  );
}

/** the plate's name, painted on its rim along the front-left edge (z = +PLATE / 2), reading toward the front corner */
function PlateName({ name, theme }: { name: NonNullable<ReturnType<typeof usePlateName>>; theme: SceneTheme }) {
  const mesh = useRef<Mesh>(null);
  const geometry = useMemo(() => {
    const g = new PlaneGeometry(name.aspect, 1);
    // flat on the plate, face up, the letters' up into the plate (-z)
    g.rotateX(-Math.PI / 2);
    return g;
  }, [name]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  // the same size on screen at every zoom, inside the rim
  useFrame(({ camera }) => {
    mesh.current?.scale.setScalar(plateNameCap(camera, NAME_CAP_PX, RIM * NAME_FILL) / name.cap);
  });
  // on the edge's middle, as in the network drawing
  return (
    <mesh ref={mesh} geometry={geometry} position={[0, PLATE_T / 2 + 0.002, GRID / 2 + RIM / 2]}>
      <meshBasicMaterial color={PALETTE[theme].plateInk} alphaMap={name.texture} transparent depthWrite={false} />
    </mesh>
  );
}

function Rig({
  count,
  labels,
  shared,
  children,
}: {
  count: number;
  labels: boolean;
  shared: Shared;
  children: ReactNode;
}) {
  const group = useRef<Group>(null);
  const size = useThree((s) => s.size);
  const camera = useThree((s) => s.camera);
  const invalidate = useThree((s) => s.invalidate);
  // the label column is fixed px and the drawing is in units, so the framing is worked out per size
  useLayoutEffect(() => {
    const { zoom, gap, target } = frameFor(size.width, size.height, count, labels);
    shared.gap = gap;
    camera.position.set(target[0] + VIEW[0], target[1] + VIEW[1], target[2] + VIEW[2]);
    camera.lookAt(...target);
    camera.zoom = zoom;
    camera.updateProjectionMatrix();
    invalidate();
  }, [size, camera, count, labels, shared, invalidate]);
  // a small turn after the pointer, before drei's Html reads the positions
  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const to = state.pointer.x * 0.1;
    g.rotation.y = MathUtils.damp(g.rotation.y, to, 3, Math.min(dt, 1 / 30));
    if (Math.abs(g.rotation.y - to) > 0.0005) state.invalidate();
  }, -1);
  return <group ref={group}>{children}</group>;
}

function Stack({
  layers,
  active,
  spread,
  onPoint,
  labels,
  theme,
  running,
  onReady,
  onLanded,
}: Required<Omit<StackSceneProps, "onPoint" | "play">> &
  Pick<StackSceneProps, "onPoint"> &
  SceneProps & { onLanded: () => void }) {
  const [shared] = useState<Shared>(() => ({ time: 0, running, landed: false, active, spread, gap: GAP_OPEN }));
  // the frame callbacks read the newest props from here
  shared.running = running;
  shared.active = active;
  shared.spread = spread;
  const geometry = useGeometry(theme);
  const end = (layers.length - 1) * DROP_STAGGER_S + DROP_S;
  const name = usePlateName();
  // a face that never loads must not hold the scene back
  const [late, setLate] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setLate(true), READY_WAIT_MS);
    return () => window.clearTimeout(timer);
  }, []);
  return (
    <>
      <Tick shared={shared} end={end} onLanded={onLanded} />
      <Kick spread={spread} active={active} running={running} />
      <Ready when={name !== null || late} onReady={onReady} />
      <Rig count={layers.length} labels={labels} shared={shared}>
        <Plate geometry={geometry} theme={theme} name={name} />
        {layers.map((layer, i) => (
          <Layer
            key={layer.key}
            index={i}
            layer={layer}
            shared={shared}
            geometry={geometry}
            theme={theme}
            onPoint={onPoint}
            labels={labels}
          />
        ))}
      </Rig>
    </>
  );
}

export default function StackScene({
  labels = true,
  play = true,
  running,
  onReady,
  ...props
}: StackSceneProps & SceneProps) {
  // the loop runs every frame only while the drop plays on screen; otherwise
  // the scene draws on demand (off screen too, so its first frame is ready)
  const [landed, setLanded] = useState(false);
  const onLanded = useCallback(() => setLanded(true), []);
  // a canvas that is ready with its box on screen (a reload, a fast scroll)
  // stays hidden behind the still until its intro is over (SceneFrame). The
  // drop plays then, unseen, so the canvas fades in on the still's pose
  const [unseen, setUnseen] = useState(false);
  const onScreen = useRef(running);
  useEffect(() => {
    onScreen.current = running;
  }, [running]);
  const ready = useCallback(() => {
    if (onScreen.current) setUnseen(true);
    onReady();
  }, [onReady]);
  const on = running && (play || unseen);
  return (
    <Canvas
      orthographic
      flat
      camera={{ zoom: 60, near: 0.1, far: 100 }}
      dpr={[1, 2]}
      frameloop={on && !landed ? "always" : "demand"}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      <Stack {...props} labels={labels} running={on} onReady={ready} onLanded={onLanded} />
    </Canvas>
  );
}
