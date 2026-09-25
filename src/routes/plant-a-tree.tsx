import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/plant-a-tree")({
  head: () => ({
    meta: [
      { title: "Plant a Tree — Heejae Cho" },
      {
        name: "description",
        content: "A small procedural tree experiment inspired by a Python turtle sketch.",
      },
    ],
  }),
  component: PlantATree,
});

type TreeSettings = {
  generations: number;
  distance: number;
  decay: number;
  turn: number;
  randomness: number;
};

type Branch = {
  x: number;
  y: number;
  angle: number;
  length: number;
  generation: number;
};

const initialSettings: TreeSettings = {
  generations: 15,
  distance: 110,
  decay: 1.4,
  turn: 22,
  randomness: 0.6,
};

const settingBounds: Record<keyof TreeSettings, { min: number; max: number }> = {
  generations: { min: 5, max: 15 },
  distance: { min: 100, max: 260 },
  decay: { min: 1.15, max: 1.8 },
  turn: { min: -45, max: 45 },
  randomness: { min: -1, max: 1 },
};

function PlantATree() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [settings, setSettings] = useState(initialSettings);
  const [drawKey, setDrawKey] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    let cancelled = false;
    const random = seededRandom(drawKey + 7);
    const branches: Branch[] = [];
    const queue: Branch[] = [
      {
        x: 0,
        y: 0,
        angle: -Math.PI / 2,
        length: settings.distance,
        generation: 0,
      },
    ];

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(bounds.width * dpr);
      canvas.height = Math.floor(bounds.height * dpr);
      const drawingScale = Math.min(1, bounds.width / 420, bounds.height / 620);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, bounds.width, bounds.height);
      context.setTransform(dpr * drawingScale, 0, 0, dpr * drawingScale, (bounds.width * dpr) / 2, bounds.height * dpr);
      draw(0);
    };

    const draw = (visibleBranches: number) => {
      const bounds = canvas.getBoundingClientRect();
      context.clearRect(-bounds.width / 2, -bounds.height * 0.86, bounds.width, bounds.height);
      context.fillStyle = "#050505";
      context.fillRect(-bounds.width / 2, -bounds.height * 0.86, bounds.width, bounds.height);

      context.lineCap = "round";
      context.lineWidth = 1;
      context.strokeStyle = "rgba(255, 255, 255, 0.9)";

      branches.slice(0, visibleBranches).forEach((branch) => {
        context.beginPath();
        context.moveTo(branch.x, branch.y);
        context.lineTo(
          branch.x + Math.cos(branch.angle) * branch.length,
          branch.y + Math.sin(branch.angle) * branch.length,
        );
        context.stroke();
      });

    };

    while (queue.length > 0) {
      const branch = queue.shift();
      if (!branch) break;
      branches.push(branch);

      if (branch.generation < settings.generations - 1) {
        const nextLength = branch.length / settings.decay;
        const turnBias = (settings.turn * Math.PI) / 180;
        const randomnessFactor = (1 - settings.randomness) / 2;
        const angleVariation = (Math.abs(settings.turn) + 25) * randomnessFactor;
        const lengthVariation = 0.7 * randomnessFactor;
        queue.push(
          {
            x: branch.x + Math.cos(branch.angle) * branch.length,
            y: branch.y + Math.sin(branch.angle) * branch.length,
            angle: branch.angle - Math.PI / 5 + turnBias + ((random() - 0.5) * angleVariation * Math.PI) / 180,
            length: nextLength * (1 + (random() - 0.5) * lengthVariation),
            generation: branch.generation + 1,
          },
          {
            x: branch.x + Math.cos(branch.angle) * branch.length,
            y: branch.y + Math.sin(branch.angle) * branch.length,
            angle: branch.angle + Math.PI / 5 + turnBias + ((random() - 0.5) * angleVariation * Math.PI) / 180,
            length: nextLength * (1 + (random() - 0.5) * lengthVariation),
            generation: branch.generation + 1,
          },
        );
      }
    }

    const animate = (visibleBranches: number) => {
      if (cancelled) return;
      draw(visibleBranches);
      if (visibleBranches < branches.length) {
        animationFrame = window.requestAnimationFrame(() => animate(visibleBranches + 3));
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    animate(0);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, [drawKey, settings]);

  const updateSetting = (key: keyof TreeSettings, value: string) => {
    const parsedValue = Number(value);
    if (!Number.isFinite(parsedValue)) return;

    const { min, max } = settingBounds[key];
    const boundedValue = Math.min(max, Math.max(min, parsedValue));
    setSettings((current) => ({ ...current, [key]: boundedValue }));
  };

  return (
    <SiteLayout pathLabel="./home/heejae/plant_a_tree">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <p className="label">./home/heejae/miscellaneous/plant_a_tree</p>
            <h1 className="page-title mt-5">plant a tree</h1>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-start">
          <div className="min-w-0">
            <div className="tree-experiment relative overflow-hidden border border-border bg-black">
              <canvas ref={canvasRef} className="block h-[min(58vh,36rem)] min-h-[20rem] w-full sm:h-[min(68vh,42rem)] sm:min-h-[28rem]" />
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Trees, blood vessels, lightning, and countless other forms share a commonality: they are all fractal objects.
              Built recursively, each branch reflects the structure of the whole.
            </p>
          </div>

          <aside className="tree-toolbox border border-border bg-white p-4">
            <div className="mb-5 flex items-baseline justify-between gap-3 border-b border-border pb-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em]">parameters</p>
              <span className="font-mono text-[10px] text-muted-foreground">tree.py</span>
            </div>
            <div className="grid gap-4">
              <Control label="generations" range="5 to 15" description="How many recursive branch layers to grow." value={settings.generations} min={5} max={15} step={1} onChange={(value) => updateSetting("generations", value)} />
              <Control label="distance" range="100 to 260" description="The starting length of the trunk and first branches." value={settings.distance} min={100} max={260} step={10} onChange={(value) => updateSetting("distance", value)} />
              <Control label="decay" range="1.15 to 1.8" description="How quickly each generation becomes shorter." value={settings.decay} min={1.15} max={1.8} step={0.05} onChange={(value) => updateSetting("decay", value)} />
              <Control label="turn" range="-45 to 45" description="Tilt bias: negative leans left, positive leans right, zero stays balanced." value={settings.turn} min={-45} max={45} step={1} onChange={(value) => updateSetting("turn", value)} />
              <Control label="randomness" range="-1 to 1" description="At 1, branch angles and lengths are predictable. At -1, they vary heavily." value={settings.randomness} min={-1} max={1} step={0.05} onChange={(value) => updateSetting("randomness", value)} />
            </div>
            <button
              type="button"
              className="mt-6 w-full border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors hover:bg-foreground hover:text-white"
              onClick={() => setDrawKey((key) => key + 1)}
            >
              regrow
            </button>
            <p className="mt-4 font-mono text-[10px] leading-relaxed text-muted-foreground">
              Hover briefly to inspect a parameter.
            </p>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}

function Control({
  label,
  range,
  description,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  range: string;
  description: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: string) => void;
}) {
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  return (
    <label className="tree-parameter grid gap-1" data-explainer={description}>
      <span className="flex justify-between gap-2">
        <span>{label}</span>
        <output className="text-muted-foreground">{range}</output>
      </span>
      <input
        type="text"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        value={draft}
        onChange={(event) => {
          const sanitized = sanitizeNumericInput(event.target.value);
          setDraft(sanitized);
          onChange(sanitized);
        }}
        onWheel={(event) => event.currentTarget.blur()}
        onKeyDown={(event) => {
          const navigationKeys = ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight", "Home", "End"];
          if (navigationKeys.includes(event.key) || event.ctrlKey || event.metaKey) return;
          if (!/[0-9.-]/.test(event.key)) {
            event.preventDefault();
            return;
          }
          if (event.key === "-" && (min >= 0 || event.currentTarget.selectionStart !== 0 || draft.includes("-"))) {
            event.preventDefault();
          }
          if (event.key === "." && (step >= 1 || draft.includes("."))) {
            event.preventDefault();
          }
        }}
      />
    </label>
  );
}

function sanitizeNumericInput(value: string) {
  const sign = value.startsWith("-") ? "-" : "";
  const unsigned = value.replace(/[^0-9.]/g, "");
  const [whole, ...fraction] = unsigned.split(".");
  return `${sign}${whole}${fraction.length > 0 ? `.${fraction.join("")}` : ""}`;
}

function seededRandom(seed: number) {
  let value = seed % 2147483647;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}
