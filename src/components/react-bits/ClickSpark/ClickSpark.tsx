import React, { useRef, useEffect, useCallback } from 'react';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  extraScale?: number;
  children?: React.ReactNode;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  children
}) => {
  const tier = useDeviceCapability();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  // Track the running RAF id — null means the loop is not running
  const rafIdRef = useRef<number | null>(null);

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  // On low-end devices skip the canvas entirely — render children only.
  // This is the single biggest win: no canvas, no RAF, no OOM.
  if (tier === 'low') {
    return <>{children}</>;
  }

  return <ClickSparkCanvas
    sparkColor={sparkColor}
    sparkSize={sparkSize}
    sparkRadius={sparkRadius}
    sparkCount={sparkCount}
    duration={duration}
    easeFunc={easeFunc}
    extraScale={extraScale}
    sparksRef={sparksRef}
    canvasRef={canvasRef}
    rafIdRef={rafIdRef}
  >
    {children}
  </ClickSparkCanvas>;
};

// ── Inner component rendered only on high-end devices ──────────────────────────

interface CanvasProps extends Omit<ClickSparkProps, 'easing'> {
  easeFunc: (t: number) => number;
  sparksRef: React.RefObject<Spark[]>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  rafIdRef: React.MutableRefObject<number | null>;
}

const ClickSparkCanvas: React.FC<CanvasProps> = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  extraScale = 1.0,
  easeFunc,
  sparksRef,
  canvasRef,
  rafIdRef,
  children
}) => {
  // Keep canvas fixed at viewport size — never the full page height
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const sync = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    sync();

    let t: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(t); t = setTimeout(sync, 100); };
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(t);
    };
  }, [canvasRef]);

  // Draw loop — starts only when there are sparks, stops when all expire
  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sparksRef.current = sparksRef.current.filter((spark: Spark) => {
      const elapsed = timestamp - spark.startTime;
      if (elapsed >= duration) return false;

      const progress = elapsed / duration;
      const eased = easeFunc(progress);
      const distance = eased * (sparkRadius ?? 15) * extraScale;
      const lineLength = (sparkSize ?? 10) * (1 - eased);

      const x1 = spark.x + distance * Math.cos(spark.angle);
      const y1 = spark.y + distance * Math.sin(spark.angle);
      const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
      const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

      ctx.strokeStyle = sparkColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      return true;
    });

    if (sparksRef.current.length > 0) {
      rafIdRef.current = requestAnimationFrame(draw);
    } else {
      // No sparks left — stop the loop entirely until next click
      rafIdRef.current = null;
    }
  }, [canvasRef, sparksRef, rafIdRef, duration, easeFunc, sparkRadius, extraScale, sparkSize, sparkColor]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [rafIdRef]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    // Coordinates relative to the fixed viewport canvas
    const x = e.clientX;
    const y = e.clientY;
    const now = performance.now();

    const newSparks: Spark[] = Array.from({ length: sparkCount ?? 8 }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / (sparkCount ?? 8),
      startTime: now
    }));

    sparksRef.current.push(...newSparks);

    // Start the loop only if it isn't already running
    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(draw);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }} onClick={handleClick}>
      {/* Fixed canvas — always viewport-sized, never page-height */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      {children}
    </div>
  );
};

export default ClickSpark;
