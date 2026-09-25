import { useEffect, useRef, useState } from "react";

const THICK_GLYPHS = ["⣿", "⣶", "⣤", "⣷", "⣾", "⣇", "⣸", "⡇", "⢸", "⣼", "⣹"];
const MEDIUM_GLYPHS = ["⠿", "⠶", "⠦", "⠴", "⠲", "⠖", "⠓", "⠋", "⠙", "⠭", "⠽"];
const THIN_GLYPHS = ["⠋", "⠉", "⠑", "⠊", "⠈", "⠐", "⠁", "⠂", "⠄", "⠆", "⠃"];
const TWIG_GLYPHS = ["⠂", "⠁", "⠈", "⠄", "⠐", "⠠", "⠅", "⠡", "⠌", "⠊", "⠑"];

type Props = {
  density?: number;
  className?: string;
};

type Stroke = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  thickness: number;
  glyph: string;
  opacity: number;
};

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function glyphForThickness(thickness: number, random: () => number) {
  if (thickness > 6) return THICK_GLYPHS[Math.floor(random() * THICK_GLYPHS.length)];
  if (thickness > 3) return MEDIUM_GLYPHS[Math.floor(random() * MEDIUM_GLYPHS.length)];
  if (thickness > 1.2) return THIN_GLYPHS[Math.floor(random() * THIN_GLYPHS.length)];
  return TWIG_GLYPHS[Math.floor(random() * TWIG_GLYPHS.length)];
}

export function GlyphField({ density = 0.55, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;

    const buildAndDrawTree = () => {
      const random = seededRandom(72419);
      const strokes: Stroke[] = [];
      const compact = width < 720;
      const viewportScale = compact ? Math.min(0.9, Math.max(0.55, width / 520)) : 1;
      const baseLength =
        Math.min(height * (compact ? 0.22 : 0.32), width * (compact ? 0.52 : 0.36)) *
        viewportScale;
      const STROKE_CAP = compact ? 5000 : 7000;

      const grow = (
        x: number,
        y: number,
        length: number,
        angle: number,
        thickness: number,
        generation: number,
      ) => {
        if (strokes.length > STROKE_CAP) return;

        if (thickness < 0.5 || length < 3 || generation > 15) {
          const twigCount = Math.round((2 + random() * 4) * (0.5 + density));
          for (let i = 0; i < twigCount; i += 1) {
            const reach = 4 + random() * 10;
            const twigAngle = angle + (random() - 0.5) * 1.8;
            strokes.push({
              x1: x,
              y1: y,
              x2: x + Math.cos(twigAngle) * reach,
              y2: y + Math.sin(twigAngle) * reach,
              thickness: compact ? 0.9 : 0.6,
              glyph: TWIG_GLYPHS[Math.floor(random() * TWIG_GLYPHS.length)] ?? "⠂",
              opacity: compact ? 0.65 + random() * 0.22 : 0.3 + random() * 0.25,
            });
          }
          return;
        }

        // slight organic curve rather than a perfectly straight segment
        const wobble = (random() - 0.5) * 0.22;
        const x2 = x + Math.cos(angle + wobble) * length;
        const y2 = y + Math.sin(angle + wobble) * length;

        strokes.push({
          x1: x,
          y1: y,
          x2,
          y2,
          thickness,
          glyph: glyphForThickness(thickness, random) ?? "⠂",
          opacity: compact
            ? 0.7 + Math.min(thickness / 10, 1) * 0.4
            : 0.4 + Math.min(thickness / 12, 1) * 0.5,
        });

        // irregular branching: sometimes just a bend, sometimes 2, occasionally 3 —
        // this is what breaks the "uniform fractal" look
        const roll = random();
        let children: { angleOffset: number; lengthFactor: number; thicknessFactor: number }[];

        if (roll < 0.12) {
          children = [
            {
              angleOffset: (random() - 0.5) * 0.35,
              lengthFactor: 0.82 + random() * 0.12,
              thicknessFactor: 0.86 + random() * 0.08,
            },
          ];
        } else if (roll < 0.78) {
          const side = random() > 0.5 ? 1 : -1;
          children = [
            {
              angleOffset: side * (0.18 + random() * 0.34),
              lengthFactor: 0.68 + random() * 0.2,
              thicknessFactor: 0.6 + random() * 0.16,
            },
            {
              angleOffset: -side * (0.1 + random() * 0.5),
              lengthFactor: 0.5 + random() * 0.28,
              thicknessFactor: 0.4 + random() * 0.2,
            },
          ];
        } else {
          children = [
            {
              angleOffset: -(0.15 + random() * 0.4),
              lengthFactor: 0.6 + random() * 0.2,
              thicknessFactor: 0.48 + random() * 0.15,
            },
            {
              angleOffset: (random() - 0.5) * 0.2,
              lengthFactor: 0.7 + random() * 0.18,
              thicknessFactor: 0.55 + random() * 0.15,
            },
            {
              angleOffset: 0.15 + random() * 0.4,
              lengthFactor: 0.55 + random() * 0.2,
              thicknessFactor: 0.4 + random() * 0.15,
            },
          ];
        }

        for (const child of children) {
          grow(
            x2,
            y2,
            length * child.lengthFactor,
            angle + child.angleOffset,
            thickness * child.thicknessFactor,
            generation + 1,
          );
        }
      };

      // Start the tree at roughly half the right-side height for a more centered, upward branch.
      const trunkAngle = compact ? -Math.PI + 0.25 : -Math.PI + 0.18;
      const secondaryAngle = compact ? -Math.PI + 0.62 : -Math.PI + 0.5;
      const trunkThickness = Math.max(1.8, compact ? 3.5 : 4.6) * viewportScale;
      const secondaryThickness = (compact ? 3.1 : 3.8) * viewportScale;

      grow(
        width + baseLength * (compact ? 0.22 : 0.15),
        height * (compact ? 0.44 : 0.5),
        baseLength,
        trunkAngle,
        trunkThickness,
        0,
      );
      grow(
        width + baseLength * (compact ? 0.14 : 0.05),
        height * (compact ? 0.58 : 0.64),
        baseLength * (compact ? 0.76 : 0.7),
        secondaryAngle,
        secondaryThickness,
        0,
      );

      context.clearRect(0, 0, width, height);
      context.textAlign = "center";
      context.textBaseline = "middle";

      for (const stroke of strokes) {
        const dx = stroke.x2 - stroke.x1;
        const dy = stroke.y2 - stroke.y1;
        const distance = Math.hypot(dx, dy);
        const spacing = Math.max(5, 9 - stroke.thickness * 0.3);
        const steps = Math.max(1, Math.ceil(distance / spacing));
        const fontSize = 6 + Math.min(stroke.thickness, 13) * 0.9;
        context.font = `${fontSize}px "Courier Prime", ui-monospace, monospace`;
        context.fillStyle = `color-mix(in oklab, var(--foreground) ${Math.round(stroke.opacity * 100)}%, transparent)`;

        // fake branch width with 1–3 parallel strands of glyphs
        const strands = stroke.thickness > 6 ? 3 : stroke.thickness > 3 ? 2 : 1;
        const perpAngle = Math.atan2(dy, dx) + Math.PI / 2;

        for (let s = 0; s < strands; s += 1) {
          const offset = strands === 1 ? 0 : (s - (strands - 1) / 2) * (fontSize * 0.4);
          const ox = Math.cos(perpAngle) * offset;
          const oy = Math.sin(perpAngle) * offset;
          for (let i = 0; i <= steps; i += 1) {
            const progress = i / steps;
            context.fillText(
              stroke.glyph,
              stroke.x1 + dx * progress + ox,
              stroke.y1 + dy * progress + oy,
            );
          }
        }
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildAndDrawTree();
    };

    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [mounted, density]);

  return (
    <div
      className={`ascii-tree pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {mounted ? <canvas ref={canvasRef} className="h-full w-full" /> : null}
    </div>
  );
}
