"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: "node" | "chip";
}

interface Pulse {
  p1: Particle;
  p2: Particle;
  progress: number;
  speed: number;
  points: { x: number, y: number }[]; // Path points for right-angled movement
}

const NeuralNetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let pulses: Pulse[] = [];
    const particleCount = 60; // Reduced count
    const connectionDistance = 180; // Reduced distance
    const mouseConnectionDistance = 250;

    const mouse = {
      x: null as number | null,
      y: null as number | null,
    };

    const createParticle = (w: number, h: number): Particle => {
      const z = Math.random();
      const x = Math.floor(Math.random() * (w / 20)) * 20;
      const y = Math.floor(Math.random() * (h / 20)) * 20;
      
      return {
        x,
        y,
        z,
        vx: (Math.random() > 0.5 ? 1 : -1) * (0.1 + z * 0.15), // Slower
        vy: (Math.random() > 0.5 ? 1 : -1) * (0.1 + z * 0.15), // Slower
        size: (z * 2.5) + 1,
        opacity: (z * 0.3) + 0.1, // Much lower opacity
        type: Math.random() > 0.8 ? "chip" : "node"
      };
    };

    const getRightAnglePath = (p1: { x: number, y: number }, p2: { x: number, y: number }) => {
      const midX = p1.x;
      const midY = p2.y;
      return [p1, { x: midX, y: midY }, p2];
    };

    const init = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(canvas.width, canvas.height));
      }
      pulses = [];
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle grid
      ctx.beginPath();
      ctx.strokeStyle = "rgba(212, 175, 55, 0.02)"; // Fainter grid
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        if (p.type === "chip") {
          ctx.rect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
        } else {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
        ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
        ctx.fill();
        
        if (p.type === "chip") {
          ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const dz = Math.abs(particles[i].z - particles[j].z);

          if (dist < connectionDistance && dz < 0.25) {
            const depthFactor = (particles[i].z + particles[j].z) / 2;
            const opacity = (1 - dist / connectionDistance) * (1 - dz / 0.25) * depthFactor * 0.15; // Lower opacity
            
            const path = getRightAnglePath(particles[i], particles[j]);
            
            ctx.beginPath();
            ctx.moveTo(path[0].x, path[0].y);
            ctx.lineTo(path[1].x, path[1].y);
            ctx.lineTo(path[2].x, path[2].y);
            
            ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
            ctx.lineWidth = 0.8 * depthFactor; // Thinner lines
            ctx.stroke();

            if (Math.random() < 0.0004 && pulses.length < 20) { // Lower pulse frequency
              pulses.push({
                p1: particles[i],
                p2: particles[j],
                progress: 0,
                speed: 0.002 + Math.random() * 0.005,
                points: path
              });
            }
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseConnectionDistance) {
            const opacity = (1 - dist / mouseConnectionDistance) * particles[i].z * 0.25;
            const path = getRightAnglePath(particles[i], { x: mouse.x, y: mouse.y });
            
            ctx.beginPath();
            ctx.moveTo(path[0].x, path[0].y);
            ctx.lineTo(path[1].x, path[1].y);
            ctx.lineTo(path[2].x, path[2].y);
            
            ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
            ctx.lineWidth = 1 * particles[i].z;
            ctx.stroke();
          }
        }
      }

      pulses = pulses.filter(pulse => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) return false;

        let x, y;
        if (pulse.progress < 0.5) {
          const t = pulse.progress * 2;
          x = pulse.points[0].x + (pulse.points[1].x - pulse.points[0].x) * t;
          y = pulse.points[0].y + (pulse.points[1].y - pulse.points[0].y) * t;
        } else {
          const t = (pulse.progress - 0.5) * 2;
          x = pulse.points[1].x + (pulse.points[2].x - pulse.points[1].x) * t;
          y = pulse.points[1].y + (pulse.points[2].y - pulse.points[1].y) * t;
        }

        const z = pulse.p1.z;
        const size = 3 * z;

        ctx.fillStyle = `rgba(255, 255, 255, ${0.7 * z})`; // Softer pulses
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(212, 175, 55, 0.4)";
        ctx.fillRect(x - size/2, y - size/2, size, size);
        ctx.shadowBlur = 0;

        return true;
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    init();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="block w-full h-full opacity-60"
      />
    </div>
  );
};

export default NeuralNetworkBackground;
