import React, { useEffect, useRef } from 'react';

const NetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Mouse state
    const mouse = { x: -1000, y: -1000, radius: 200 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseX: number;
      baseY: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.3; // Gentle floating velocity
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 1; // Random size between 1 and 3
        this.baseX = this.x;
        this.baseY = this.y;
      }

      update() {
        // Standard movement
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;

        // Mouse Interaction - Repulsion
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - distance) / mouse.radius;
          
          // Push away from mouse
          const pushX = Math.cos(angle) * force * 3; 
          const pushY = Math.sin(angle) * force * 3;
          
          this.x -= pushX;
          this.y -= pushY;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Check for dark mode to adjust opacity/color if needed
        // We can check the class on html element
        const isDark = document.documentElement.classList.contains('dark');
        
        ctx.fillStyle = isDark ? 'rgba(96, 165, 250, 0.4)' : 'rgba(37, 99, 235, 0.3)'; // Darker blue in light mode
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      // Calculate density based on screen size
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 18000);
      
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isDark = document.documentElement.classList.contains('dark');

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Draw connections between close particles
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Connect particles if they are close enough
          if (distance < 120) {
            ctx.beginPath();
            // Opacity depends on distance - closer is more opaque
            const alpha = 0.15 - distance/1000;
            ctx.strokeStyle = isDark 
                ? `rgba(59, 130, 246, ${alpha})` 
                : `rgba(37, 99, 235, ${alpha})`; // Darker line in light mode
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
        mouse.x = -1000;
        mouse.y = -1000;
    };
    
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-0 pointer-events-none opacity-40"
    />
  );
};

export default NetworkBackground;