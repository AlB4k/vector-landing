import React, { useEffect, useRef, useMemo } from 'react';

const Envelopes = ({ intensity, isLight }) => {
  const items = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * (32 - 16) + 16,
    left: Math.random() * 100,
    bottom: Math.random() * 50 - 20,
    delay: Math.random() * 20,
    duration: Math.random() * (40 - 25) + 25,
  })), []);

  const opacity = intensity === 'subtle'
    ? (isLight ? 0.06 : 0.08)
    : (isLight ? 0.15 : 0.18);

  const color = isLight ? '#2563eb' : '#60a5fa';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map(item => (
        <div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.left}%`,
            bottom: `${item.bottom}%`,
            width: `${item.size}px`,
            height: `${item.size}px`,
            opacity: 0,
            color: color,
            animation: `float-envelope ${item.duration}s linear ${item.delay}s infinite`,
            willChange: 'transform, opacity'
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <polyline points="2,4 12,13 22,4"/>
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes float-envelope {
          0%   { transform: translate(0, 0) rotate(-5deg); opacity: 0; }
          10%  { opacity: ${opacity}; }
          90%  { opacity: ${opacity}; }
          100% { transform: translate(60vw, -70vh) rotate(5deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const Routes = ({ intensity, isLight }) => {
  const nodes = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
  })), []);

  const routes = useMemo(() => {
    const res = [];
    for (let i = 0; i < nodes.length; i++) {
      const nextIdx = (i + 1) % nodes.length;
      res.push({
        id: i,
        from: nodes[i],
        to: nodes[nextIdx],
        delay: i * 2,
      });
    }
    return res;
  }, [nodes]);

  const opacity = intensity === 'subtle'
    ? (isLight ? 0.06 : 0.08)
    : (isLight ? 0.15 : 0.18);

  const color = isLight ? '#2563eb' : '#60a5fa';

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity }}>
      {routes.map(route => (
        <g key={route.id}>
          <line
            x1={`${route.from.x}%`}
            y1={`${route.from.y}%`}
            x2={`${route.to.x}%`}
            y2={`${route.to.y}%`}
            stroke={color}
            strokeWidth="1"
            strokeDasharray="6 4"
            style={{
              animation: `draw-route 5s linear ${route.delay}s infinite`,
              willChange: 'stroke-dashoffset'
            }}
          />
          <circle
            cx={`${route.from.x}%`}
            cy={`${route.from.y}%`}
            r="3"
            fill={color}
            style={{
              animation: 'pulse-node 3s ease-in-out infinite',
              transformOrigin: `${route.from.x}% ${route.from.y}%`
            }}
          />
        </g>
      ))}
      <style>{`
        @keyframes draw-route {
          0%   { stroke-dashoffset: 100; opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes pulse-node {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50%       { transform: scale(1.3); opacity: 1; }
        }
      `}</style>
    </svg>
  );
};

const Documents = ({ intensity, isLight }) => {
  const items = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    id: i,
    width: Math.random() * (35 - 20) + 20,
    left: Math.random() * 100,
    delay: Math.random() * 15,
    duration: Math.random() * (35 - 20) + 20,
  })), []);

  const opacity = intensity === 'subtle'
    ? (isLight ? 0.06 : 0.08)
    : (isLight ? 0.15 : 0.18);

  const color = isLight ? '#2563eb' : '#60a5fa';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map(item => (
        <div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.left}%`,
            width: `${item.width}px`,
            height: `${item.width * 1.4}px`,
            opacity: 0,
            color: color,
            border: `1.5px solid ${color}`,
            borderRadius: '2px',
            padding: '2px',
            animation: `float-document ${item.duration}s linear ${item.delay}s infinite`,
            willChange: 'transform, opacity'
          }}
        >
          <div className="w-4/5 h-[1px] mb-1 bg-current opacity-40"></div>
          <div className="w-full h-[1px] mb-1 bg-current opacity-40"></div>
          <div className="w-2/3 h-[1px] mb-1 bg-current opacity-40"></div>
          <div className="w-1/2 h-[1px] bg-current opacity-40"></div>
        </div>
      ))}
      <style>{`
        @keyframes float-document {
          0%   { transform: translateY(100vh) translateX(0); opacity: 0; }
          10%  { opacity: ${opacity}; }
          50%  { transform: translateY(0) translateX(10px); }
          90%  { opacity: ${opacity}; }
          100% { transform: translateY(-100vh) translateX(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const Network = ({ intensity, isLight }) => {
  const canvasRef = useRef(null);

  const opacity = intensity === 'subtle'
    ? (isLight ? 0.06 : 0.08)
    : (isLight ? 0.15 : 0.18);

  const color = isLight ? '#2563eb' : '#60a5fa';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width, height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    const points = Array.from({ length: 20 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      baseX: Math.random() * width,
      baseY: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      angle: Math.random() * Math.PI * 2
    }));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;

      // Update positions
      points.forEach(p => {
        p.angle += 0.01;
        p.x = p.baseX + Math.cos(p.angle) * 30;
        p.y = p.baseY + Math.sin(p.angle) * 30;
      });

      // Draw lines
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            ctx.beginPath();
            ctx.lineWidth = 0.5;
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw points
      points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, opacity]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

const BackgroundAnimation = ({ config, isLight }) => {
  const randomVariantRef = useRef(null);

  if (!config?.enabled) return null;

  const variants = config.variants || [
    { id: 'envelopes' },
    { id: 'routes' },
    { id: 'documents' },
    { id: 'network' }
  ];

  if (config.variant === 'random' && !randomVariantRef.current) {
    randomVariantRef.current = variants[Math.floor(Math.random() * variants.length)].id;
  }

  const activeVariant = config.variant === 'random'
    ? randomVariantRef.current
    : (config.variant || 'envelopes');

  return (
    <div
      className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {activeVariant === 'envelopes' && <Envelopes intensity={config.intensity} isLight={isLight} />}
      {activeVariant === 'routes' && <Routes intensity={config.intensity} isLight={isLight} />}
      {activeVariant === 'documents' && <Documents intensity={config.intensity} isLight={isLight} />}
      {activeVariant === 'network' && <Network intensity={config.intensity} isLight={isLight} />}
    </div>
  );
};

export default BackgroundAnimation;
