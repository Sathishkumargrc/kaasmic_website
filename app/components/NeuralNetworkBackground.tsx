"use client";

import { useEffect, useRef, useState } from "react";

// Interfaces for our premium sci-fi motherboard background
interface Point {
  x: number;
  y: number;
}

interface CircuitTrace {
  points: Point[];
  color: string;
  glowColor: string;
  width: number;
  pulsePos: number; // position in pixels along the trace
  pulseSpeed: number; // pixels per frame
  pulseSize: number;
  pulseColor: string;
  crawlProgress: number; // 0 to 1 for entrance animation
  crawlSpeed: number;
  active: boolean;
  length: number;
  segments: { len: number; cumLen: number }[];
}

interface HudCore {
  x: number;
  y: number;
  radius: number;
  targetRadius: number;
  pulseVal: number;
  pulseDir: number;
  rotation1: number;
  rotation2: number;
  rotation3: number;
  rotationSpeed: number;
  name: string;
  status: string;
  frequency: string;
  color: string;
  glowColor: string;
}

interface SolderPad {
  x: number;
  y: number;
  radius: number;
  color: string;
  glowPhase: number;
  glowSpeed: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

export default function MotherboardBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = 0;
    let H = 0;
    let frame = 0;

    // Premium Color Palette
    const GOLD = "#D4AF37";
    const GOLD_GLOW = "rgba(212, 175, 55, 0.15)";
    const GOLD_PULSE = "#FFF3D1";
    
    const CYAN = "#00f0ff";
    const CYAN_GLOW = "rgba(0, 240, 255, 0.12)";
    const CYAN_PULSE = "#E0FFFF";

    const BLUE_DARK = "#1A2664";
    const TRACE_BASE = "rgba(255, 255, 255, 0.03)";

    let traces: CircuitTrace[] = [];
    let cores: HudCore[] = [];
    let pads: SolderPad[] = [];
    let sparks: Spark[] = [];

    // Helper: Generate professional PCB traces with clean 45-degree bends
    function generatePcbPath(start: Point, end: Point): Point[] {
      const points: Point[] = [start];
      const dx = end.x - start.x;
      const dy = end.y - start.y;

      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal-heavy routing
        const diagonalLen = Math.abs(dy);
        const signX = Math.sign(dx);
        const signY = Math.sign(dy);

        // First horizontal run
        const firstX = start.x + (dx - diagonalLen * signX) * 0.5;
        points.push({ x: firstX, y: start.y });

        // Diagonal bend (45 degrees because dx = dy = diagonalLen)
        points.push({ x: firstX + diagonalLen * signX, y: end.y });
      } else {
        // Vertical-heavy routing
        const diagonalLen = Math.abs(dx);
        const signX = Math.sign(dx);
        const signY = Math.sign(dy);

        // First vertical run
        const firstY = start.y + (dy - diagonalLen * signY) * 0.5;
        points.push({ x: start.x, y: firstY });

        // Diagonal bend (45 degrees)
        points.push({ x: end.x, y: firstY + diagonalLen * signY });
      }

      points.push(end);
      return points;
    }

    function createTrace(points: Point[], color: string, glowColor: string, width: number, pulseColor: string): CircuitTrace {
      let totalLen = 0;
      const segments = [];
      for (let i = 0; i < points.length - 1; i++) {
        const dx = points[i + 1].x - points[i].x;
        const dy = points[i + 1].y - points[i].y;
        const len = Math.sqrt(dx * dx + dy * dy);
        totalLen += len;
        segments.push({ len, cumLen: totalLen });
      }
      return {
        points,
        color,
        glowColor,
        width,
        pulsePos: Math.random() * totalLen,
        pulseSpeed: 1.2 + Math.random() * 1.5,
        pulseSize: 2 + Math.random() * 2,
        pulseColor,
        crawlProgress: 0,
        crawlSpeed: 0.008 + Math.random() * 0.012,
        active: true,
        length: totalLen,
        segments,
      };
    }

    function getPositionOnTrace(trace: CircuitTrace, pos: number): Point | null {
      const pts = trace.points;
      if (pts.length < 2) return null;

      // Clamp position between 0 and trace length
      const targetLen = Math.max(0, Math.min(pos, trace.length));

      for (let i = 0; i < trace.segments.length; i++) {
        const seg = trace.segments[i];
        const prevCum = i === 0 ? 0 : trace.segments[i - 1].cumLen;
        if (targetLen <= seg.cumLen) {
          const p1 = pts[i];
          const p2 = pts[i + 1];
          const segT = seg.len > 0 ? (targetLen - prevCum) / seg.len : 0;
          return {
            x: p1.x + (p2.x - p1.x) * segT,
            y: p1.y + (p2.y - p1.y) * segT,
          };
        }
      }
      return pts[pts.length - 1];
    }

    function spawnSparks(x: number, y: number, color: string, count: number = 8) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 2.0;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1 + Math.random() * 1.5,
          color,
          alpha: 1.0,
          decay: 0.015 + Math.random() * 0.02,
        });
      }
    }

    function buildBoard() {
      traces = [];
      cores = [];
      pads = [];
      sparks = [];

      const isMobile = W < 768;

      // ── Build Cores (Concentric Tech HUDs) ─────────────────────────
      if (isMobile) {
        // Mobile layout: One central high-tech core near the bottom visual center
        cores.push({
          x: W * 0.5,
          y: H * 0.7,
          radius: 80,
          targetRadius: 80,
          pulseVal: 0,
          pulseDir: 1,
          rotation1: 0,
          rotation2: 0,
          rotation3: 0,
          rotationSpeed: 1.0,
          name: "CORE_MUTEX_01",
          status: "SECURE_SHIELD",
          frequency: "99.9% 24K",
          color: GOLD,
          glowColor: GOLD_GLOW,
        });
      } else {
        // Desktop layout: Dual symmetrical sci-fi cores
        // Core 1 (Main, Gold): Behind the floating phone on the right
        cores.push({
          x: W * 0.72,
          y: H * 0.52,
          radius: 110,
          targetRadius: 110,
          pulseVal: 0,
          pulseDir: 1,
          rotation1: 0,
          rotation2: 0,
          rotation3: 0,
          rotationSpeed: 1.0,
          name: "KAASMIC_SECURE_VAULT",
          status: "ENCRYPTED_ONLINE",
          frequency: "24K_GOLD_VAL",
          color: GOLD,
          glowColor: GOLD_GLOW,
        });

        // Core 2 (Sub, Neon Cyan): Lower left under the CTA area
        cores.push({
          x: W * 0.22,
          y: H * 0.72,
          radius: 75,
          targetRadius: 75,
          pulseVal: 0.5,
          pulseDir: -1,
          rotation1: Math.PI / 4,
          rotation2: -Math.PI / 4,
          rotation3: Math.PI / 2,
          rotationSpeed: 1.2,
          name: "LEDGER_BUS_v1.0",
          status: "SYNC_COMPLETE",
          frequency: "99.9%_AG_VAL",
          color: CYAN,
          glowColor: CYAN_GLOW,
        });
      }

      // ── Build Solder Pads (Vias) ──────────────────────────────────
      const padCount = isMobile ? 15 : 45;
      for (let i = 0; i < padCount; i++) {
        // Avoid spawning directly on the text or cores
        let x = Math.random() * W;
        let y = Math.random() * H;
        
        // Prevent overcrowding near the center left (where text lies)
        if (!isMobile && x < W * 0.4 && y < H * 0.5) {
          x += W * 0.3;
        }

        pads.push({
          x,
          y,
          radius: 2 + Math.random() * 3.5,
          color: Math.random() > 0.4 ? GOLD : CYAN,
          glowPhase: Math.random() * Math.PI * 2,
          glowSpeed: 0.02 + Math.random() * 0.03,
        });
      }

      // ── Generate Connecting Traces ─────────────────────────────────
      // 1. Edge-inward traces that converge to Cores
      cores.forEach((core) => {
        const lineCount = isMobile ? 8 : 16;
        for (let i = 0; i < lineCount; i++) {
          const angle = (i / lineCount) * Math.PI * 2 + (Math.random() * 0.2 - 0.1);
          
          // Start near screen borders or deep space
          let startX = core.x + Math.cos(angle) * (core.radius * (3.5 + Math.random() * 2));
          let startY = core.y + Math.sin(angle) * (core.radius * (3.5 + Math.random() * 2));
          
          // Clamp starts to screen boundaries
          startX = Math.max(10, Math.min(W - 10, startX));
          startY = Math.max(10, Math.min(H - 10, startY));

          // Destination is the edge of the core
          const endX = core.x + Math.cos(angle) * (core.radius + 8);
          const endY = core.y + Math.sin(angle) * (core.radius + 8);

          const themeColor = Math.random() > 0.3 ? GOLD : CYAN;
          const themeGlow = themeColor === GOLD ? GOLD_GLOW : CYAN_GLOW;
          const themePulse = themeColor === GOLD ? GOLD_PULSE : CYAN_PULSE;

          const pcbPoints = generatePcbPath({ x: startX, y: startY }, { x: endX, y: endY });
          traces.push(createTrace(pcbPoints, themeColor, themeGlow, 0.8 + Math.random() * 1.0, themePulse));
        }
      });

      // 2. Inter-core main digital bus traces (only on desktop)
      if (!isMobile && cores.length >= 2) {
        const c1 = cores[0];
        const c2 = cores[1];
        
        const busLines = 3; // Triple copper bus line
        for (let i = 0; i < busLines; i++) {
          const offset = (i - 1) * 12;
          
          // Offset start and end points to make them parallel
          const startPt = { x: c1.x - c1.radius - 8, y: c1.y + offset };
          const endPt = { x: c2.x + c2.radius + 8, y: c2.y + offset };
          
          const pcbPoints = generatePcbPath(startPt, endPt);
          
          // Make bus lines slightly wider and cyan colored for cyber feel
          traces.push(createTrace(pcbPoints, CYAN, CYAN_GLOW, 1.5, CYAN_PULSE));
        }
      }

      // 3. Random background mini trace connections
      const miniTraceCount = isMobile ? 10 : 25;
      for (let i = 0; i < miniTraceCount; i++) {
        const pad1 = pads[Math.floor(Math.random() * pads.length)];
        const pad2 = pads[Math.floor(Math.random() * pads.length)];
        
        // Connect only if they are relatively close
        const dist = Math.hypot(pad2.x - pad1.x, pad2.y - pad1.y);
        if (dist > 50 && dist < (isMobile ? 200 : 350)) {
          const themeColor = Math.random() > 0.5 ? GOLD : CYAN;
          const themeGlow = themeColor === GOLD ? GOLD_GLOW : CYAN_GLOW;
          const themePulse = themeColor === GOLD ? GOLD_PULSE : CYAN_PULSE;
          
          const pcbPoints = generatePcbPath({ x: pad1.x, y: pad1.y }, { x: pad2.x, y: pad2.y });
          traces.push(createTrace(pcbPoints, themeColor, themeGlow, 0.7, themePulse));
        }
      }
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx!.scale(dpr, dpr);
      buildBoard();
    }

    // ── Draw Operations ──────────────────────────────────────────────
    
    function drawGrid() {
      ctx!.save();
      const cellSize = 60;
      ctx!.strokeStyle = "rgba(212, 175, 55, 0.01)"; // Even more subtle lines
      ctx!.lineWidth = 0.5;

      // Draw subtle grid lines
      for (let x = 0; x < W; x += cellSize) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, H);
        ctx!.stroke();
      }
      for (let y = 0; y < H; y += cellSize) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(W, y);
        ctx!.stroke();
      }

      // Draw subtle micro dots at intersections
      ctx!.fillStyle = "rgba(212, 175, 55, 0.04)"; // Softer dots
      for (let x = 0; x < W; x += cellSize) {
        for (let y = 0; y < H; y += cellSize) {
          ctx!.beginPath();
          ctx!.arc(x, y, 0.8, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
      ctx!.restore();
    }

    function drawHudCore(core: HudCore) {
      ctx!.save();
      const { x, y, radius, color, glowColor, name, status, frequency, pulseVal } = core;

      // Dynamic glowing background aura - very mild
      const pulseRadiusScale = 1.0 + Math.sin(frame * 0.03 + pulseVal) * 0.06;
      const currentRadius = radius * pulseRadiusScale;
      
      const radGrd = ctx!.createRadialGradient(x, y, 0, x, y, currentRadius * 1.5);
      radGrd.addColorStop(0, color === GOLD ? "rgba(212, 175, 55, 0.06)" : "rgba(0, 240, 255, 0.05)");
      radGrd.addColorStop(0.5, "rgba(5, 10, 31, 0)");
      radGrd.addColorStop(1, "rgba(5, 10, 31, 0)");
      ctx!.fillStyle = radGrd;
      ctx!.beginPath();
      ctx!.arc(x, y, currentRadius * 1.5, 0, Math.PI * 2);
      ctx!.fill();

      // Outer Ring 1: Solid tech ring with thin outer lines - very faint
      ctx!.strokeStyle = color === GOLD ? "rgba(212,175,55,0.06)" : "rgba(0,240,255,0.05)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.arc(x, y, radius + 15, 0, Math.PI * 2);
      ctx!.stroke();

      // Rotating Ring 2: Segmented dashed layout (hud style) - soft opacity
      ctx!.strokeStyle = color === GOLD ? "rgba(212, 175, 55, 0.12)" : "rgba(0, 240, 255, 0.10)";
      ctx!.lineWidth = 1.2;
      ctx!.setLineDash([15, 45, 5, 15, 80, 20]);
      ctx!.save();
      ctx!.translate(x, y);
      ctx!.rotate(core.rotation1);
      ctx!.beginPath();
      ctx!.arc(0, 0, radius, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.restore();
      ctx!.setLineDash([]); // reset

      // Rotating Ring 3: Ticks / compass indicators - soft opacity
      ctx!.strokeStyle = color === GOLD ? "rgba(212,175,55,0.08)" : "rgba(0,240,255,0.06)";
      ctx!.lineWidth = 1.0;
      ctx!.save();
      ctx!.translate(x, y);
      ctx!.rotate(core.rotation2);
      ctx!.beginPath();
      // Draw 30 tick lines radiating
      const tickCount = 24;
      for (let i = 0; i < tickCount; i++) {
        const tickAngle = (i / tickCount) * Math.PI * 2;
        const xStart = Math.cos(tickAngle) * (radius - 8);
        const yStart = Math.sin(tickAngle) * (radius - 8);
        const xEnd = Math.cos(tickAngle) * (radius - 3);
        const yEnd = Math.sin(tickAngle) * (radius - 3);
        ctx!.moveTo(xStart, yStart);
        ctx!.lineTo(xEnd, yEnd);
      }
      ctx!.stroke();
      ctx!.restore();

      // Rotating Ring 4: Inner digital sweep ring - very soft
      ctx!.strokeStyle = color === GOLD ? "rgba(212,175,55,0.06)" : "rgba(0,240,255,0.05)";
      ctx!.lineWidth = 0.8;
      ctx!.setLineDash([4, 8]);
      ctx!.save();
      ctx!.translate(x, y);
      ctx!.rotate(core.rotation3);
      ctx!.beginPath();
      ctx!.arc(0, 0, radius - 16, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.restore();
      ctx!.setLineDash([]);

      // Center glowing reactor ring
      ctx!.strokeStyle = color === GOLD ? "rgba(212,175,55,0.18)" : "rgba(0,240,255,0.15)";
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.arc(x, y, 10, 0, Math.PI * 2);
      ctx!.stroke();
      
      // Central pulsing light - soft
      const centerPulse = 0.5 + Math.sin(frame * 0.05 + pulseVal) * 0.3;
      ctx!.fillStyle = color === GOLD ? "rgba(212, 175, 55, 0.3)" : "rgba(0, 240, 255, 0.25)";
      ctx!.beginPath();
      ctx!.arc(x, y, 4 + centerPulse * 3, 0, Math.PI * 2);
      ctx!.fill();

      // Technical overlay text - very dim
      ctx!.fillStyle = color === GOLD ? "rgba(212,175,55,0.22)" : "rgba(0,240,255,0.18)";
      ctx!.font = "bold 8px monospace";
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      ctx!.fillText(name, x, y - radius - 26);
      
      ctx!.fillStyle = "rgba(255, 255, 255, 0.15)";
      ctx!.font = "7px monospace";
      ctx!.fillText(`STATUS // ${status}`, x, y + radius + 26);
      ctx!.fillText(`FREQ // ${frequency}`, x, y + radius + 36);

      // Symmetrical technical brackets
      ctx!.strokeStyle = color === GOLD ? "rgba(212,175,55,0.1)" : "rgba(0,240,255,0.08)";
      ctx!.lineWidth = 0.8;
      const bracketSize = 12;
      const offset = radius + 20;

      // Top Left Bracket
      ctx!.beginPath();
      ctx!.moveTo(x - offset + bracketSize, y - offset);
      ctx!.lineTo(x - offset, y - offset);
      ctx!.lineTo(x - offset, y - offset + bracketSize);
      ctx!.stroke();

      // Top Right Bracket
      ctx!.beginPath();
      ctx!.moveTo(x + offset - bracketSize, y - offset);
      ctx!.lineTo(x + offset, y - offset);
      ctx!.lineTo(x + offset, y - offset + bracketSize);
      ctx!.stroke();

      // Bottom Left Bracket
      ctx!.beginPath();
      ctx!.moveTo(x - offset + bracketSize, y + offset);
      ctx!.lineTo(x - offset, y + offset);
      ctx!.lineTo(x - offset, y + offset - bracketSize);
      ctx!.stroke();

      // Bottom Right Bracket
      ctx!.beginPath();
      ctx!.moveTo(x + offset - bracketSize, y + offset);
      ctx!.lineTo(x + offset, y + offset);
      ctx!.lineTo(x + offset, y + offset - bracketSize);
      ctx!.stroke();

      ctx!.restore();
    }

    function drawTrace(trace: CircuitTrace) {
      if (trace.points.length < 2) return;
      ctx!.save();

      // 1. Slow crawling entrance animation on mount
      if (trace.crawlProgress < 1) {
        trace.crawlProgress += trace.crawlSpeed;
        if (trace.crawlProgress > 1) trace.crawlProgress = 1;
      }

      const activeLen = trace.length * trace.crawlProgress;

      // 2. Draw the static copper line background - extremely faint
      ctx!.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx!.lineWidth = trace.width;
      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";
      ctx!.beginPath();
      ctx!.moveTo(trace.points[0].x, trace.points[0].y);
      for (let i = 1; i < trace.points.length; i++) {
        ctx!.lineTo(trace.points[i].x, trace.points[i].y);
      }
      ctx!.stroke();

      // 3. Draw the illuminated crawling circuit path - transparent & soft
      ctx!.strokeStyle = trace.color === GOLD ? "rgba(212, 175, 55, 0.12)" : "rgba(0, 240, 255, 0.10)";
      ctx!.shadowBlur = 2; // reduced glow
      ctx!.shadowColor = trace.color;
      ctx!.lineWidth = trace.width;
      
      let renderedLen = 0;
      ctx!.beginPath();
      ctx!.moveTo(trace.points[0].x, trace.points[0].y);

      for (let i = 0; i < trace.segments.length; i++) {
        const seg = trace.segments[i];
        const nextPt = trace.points[i + 1];
        if (renderedLen + seg.len <= activeLen) {
          ctx!.lineTo(nextPt.x, nextPt.y);
          renderedLen += seg.len;
        } else {
          // Draw partial segment up to active length
          const partialT = seg.len > 0 ? (activeLen - renderedLen) / seg.len : 0;
          const p1 = trace.points[i];
          const px = p1.x + (nextPt.x - p1.x) * partialT;
          const py = p1.y + (nextPt.y - p1.y) * partialT;
          ctx!.lineTo(px, py);
          break;
        }
      }
      ctx!.stroke();

      // Reset shadows for high performance
      ctx!.shadowBlur = 0;

      // 4. Draw moving energy packet (Pulse)
      if (trace.active && trace.crawlProgress > 0.1) {
        // Speed up pulses slightly when mouse is active in the vicinity
        let currentSpeed = trace.pulseSpeed;
        const mouse = mouseRef.current;
        if (mouse.active) {
          const firstPt = trace.points[0];
          const mDist = Math.hypot(mouse.x - firstPt.x, mouse.y - firstPt.y);
          if (mDist < 180) {
            currentSpeed *= 2.0; // Overclock pulses near mouse!
          }
        }

        trace.pulsePos += currentSpeed;
        if (trace.pulsePos > activeLen) {
          trace.pulsePos = 0;
          // Spawn little sparks at the termination point of the trace
          const termPt = getPositionOnTrace(trace, activeLen);
          if (termPt) {
            spawnSparks(termPt.x, termPt.y, trace.color === GOLD ? "rgba(212, 175, 55, 0.25)" : "rgba(0, 240, 255, 0.20)", 4);
          }
        }

        const pulsePt = getPositionOnTrace(trace, trace.pulsePos);
        if (pulsePt) {
          // Pulse halo glow - softer
          ctx!.shadowBlur = 6;
          ctx!.shadowColor = trace.color;
          
          const grad = ctx!.createRadialGradient(pulsePt.x, pulsePt.y, 0, pulsePt.x, pulsePt.y, 8);
          grad.addColorStop(0, trace.pulseColor);
          grad.addColorStop(0.3, trace.glowColor);
          grad.addColorStop(1, "transparent");
          
          ctx!.fillStyle = grad;
          ctx!.beginPath();
          ctx!.arc(pulsePt.x, pulsePt.y, 8, 0, Math.PI * 2);
          ctx!.fill();
          
          ctx!.shadowBlur = 0;

          // Inner bright light particle - soft alpha
          ctx!.fillStyle = "rgba(255, 255, 255, 0.65)";
          ctx!.beginPath();
          ctx!.arc(pulsePt.x, pulsePt.y, 1.2, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      ctx!.restore();
    }

    function drawPad(pad: SolderPad) {
      const pulse = 0.5 + 0.5 * Math.sin(frame * pad.glowSpeed + pad.glowPhase);
      ctx!.save();

      // Interactive scale near mouse
      let scale = 1.0;
      const mouse = mouseRef.current;
      if (mouse.active) {
        const dist = Math.hypot(mouse.x - pad.x, mouse.y - pad.y);
        if (dist < 100) {
          scale += (1.0 - dist / 100) * 0.8; // swell under mouse
        }
      }

      const r = pad.radius * scale;

      // Ring glow - soft
      ctx!.strokeStyle = pad.color === GOLD 
        ? `rgba(212, 175, 55, ${0.05 + pulse * 0.15})`
        : `rgba(0, 240, 255, ${0.05 + pulse * 0.15})`;
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.arc(pad.x, pad.y, r + 4, 0, Math.PI * 2);
      ctx!.stroke();

      // Outer circle - soft
      ctx!.strokeStyle = pad.color === GOLD ? "rgba(212, 175, 55, 0.18)" : "rgba(0, 240, 255, 0.15)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.arc(pad.x, pad.y, r + 1.5, 0, Math.PI * 2);
      ctx!.stroke();

      // Solid inner core - soft
      ctx!.fillStyle = pad.color === GOLD ? "rgba(212, 175, 55, 0.22)" : "rgba(0, 240, 255, 0.18)";
      ctx!.beginPath();
      ctx!.arc(pad.x, pad.y, r * 0.6, 0, Math.PI * 2);
      ctx!.fill();

      // Center silver dot - transparent
      ctx!.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx!.beginPath();
      ctx!.arc(pad.x, pad.y, 0.8, 0, Math.PI * 2);
      ctx!.fill();

      ctx!.restore();
    }

    function updateAndDrawSparks() {
      ctx!.save();
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx!.fillStyle = s.color;
        ctx!.globalAlpha = s.alpha;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.restore();
    }

    // ── Mouse Magnet Effect ──────────────────────────────────────────
    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;

      // Spawn a trail of cyan/gold electrical sparks following the cursor occasionally
      if (frame % 3 === 0) {
        const color = Math.random() > 0.5 ? GOLD : CYAN;
        spawnSparks(mouseRef.current.x, mouseRef.current.y, color, 2);
      }
    }

    function handleMouseLeave() {
      mouseRef.current.active = false;
    }

    // ── Master Render Tick ────────────────────────────────────────────
    function tick() {
      frame++;
      
      // Keep background canvas clean and fully transparent (inherits the parent radial glow background)
      ctx!.clearRect(0, 0, W, H);

      // 1. Technical background grid
      drawGrid();

      // 2. Rotate HUD circular cores
      cores.forEach((core) => {
        core.rotation1 += core.rotationSpeed * 0.005;
        core.rotation2 -= core.rotationSpeed * 0.003;
        core.rotation3 += core.rotationSpeed * 0.008;

        // Animate the core rotation values
        core.rotationSpeed = 1.0;
        
        drawHudCore(core);
      });

      // 3. Draw circuit trace paths and moving energy packets
      traces.forEach(drawTrace);

      // 4. Draw static/pulsating solder nodes
      pads.forEach(drawPad);

      // 5. Draw high-tech micro sparks/sparks particle system
      updateAndDrawSparks();

      animId = requestAnimationFrame(tick);
    }

    // Event Listeners
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    // Init
    resize();
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={{ opacity: 0.38 }} // Set overall canvas opacity to 0.38 for an exceptionally mild, elegant digital motherboard background
    />
  );
}
