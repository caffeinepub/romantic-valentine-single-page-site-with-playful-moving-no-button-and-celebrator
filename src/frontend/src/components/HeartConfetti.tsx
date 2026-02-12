import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  opacity: number;
  color: string;
}

export default function HeartConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles
    const colors = ['#ff1744', '#f50057', '#ff4081', '#ff69b4', '#ff85a2'];
    for (let i = 0; i < 100; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 100,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 20 + 15,
        opacity: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const drawHeart = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number,
      color: string
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();

      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);

      ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      ctx.bezierCurveTo(
        -size / 2,
        (size + topCurveHeight) / 2,
        0,
        (size + topCurveHeight) / 1.2,
        0,
        size
      );
      ctx.bezierCurveTo(
        0,
        (size + topCurveHeight) / 1.2,
        size / 2,
        (size + topCurveHeight) / 2,
        size / 2,
        topCurveHeight
      );
      ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);

      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const fadeStart = 3000; // Start fading after 3 seconds
      const fadeDuration = 2000; // Fade over 2 seconds

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Calculate opacity based on time
        let opacity = particle.opacity;
        if (elapsed > fadeStart) {
          opacity = Math.max(0, 1 - (elapsed - fadeStart) / fadeDuration);
        }

        drawHeart(
          particle.x,
          particle.y,
          particle.size,
          particle.rotation,
          opacity,
          particle.color
        );

        // Update particle
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;
        particle.vy += 0.1; // Gravity
      });

      // Stop animation after fade completes
      if (elapsed < fadeStart + fadeDuration) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ mixBlendMode: 'normal' }}
    />
  );
}
