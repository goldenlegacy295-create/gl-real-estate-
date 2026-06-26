import { useEffect, useRef } from 'react';

export default function GoldParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
      angle: number;
      spin: number;
    }

    const particles: Particle[] = [];
    const particleCount = 60;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1, // 1px to 3px for high-end gold dust
        speedX: (Math.random() - 0.5) * 0.3, // slow drift
        speedY: -Math.random() * 0.4 - 0.1, // slowly float upwards
        opacity: Math.random() * 0.5 + 0.1,
        fadeSpeed: Math.random() * 0.005 + 0.002,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.01,
      });
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        width = canvas.width = w;
        height = canvas.height = h;
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Slowly drift and float upwards
        p.x += p.speedX + Math.sin(p.angle) * 0.1;
        p.y += p.speedY;
        p.angle += p.spin;

        // Animate opacity to simulate organic glisten/sparkle
        p.opacity += p.fadeSpeed;
        if (p.opacity > 0.7 || p.opacity < 0.15) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Out of bounds resets
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) {
          p.x = width + 10;
        } else if (p.x > width + 10) {
          p.x = -10;
        }

        // Render beautiful glowing gold particle
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        // Gold radial gradient for high-end glowing look
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, '#FFF3D6'); // bright inner glow
        gradient.addColorStop(0.3, '#C89B3C'); // warm gold
        gradient.addColorStop(1, 'rgba(200, 155, 60, 0)'); // fade out
        
        ctx.fillStyle = gradient;
        ctx.shadowColor = '#C89B3C';
        ctx.shadowBlur = p.size * 2;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
