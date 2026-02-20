import { useEffect, useRef } from 'react';

type CurveCanvasProps = {
  height?: number;
  color?: string;
  lineWidth?: number;
  duration?: number; // animation time (ms)
  className?: string;
};

export default function CurveCanvas({
  height = 200,
  color = '#00ffff',
  lineWidth = 3,
  duration = 1500,
  className,
}: CurveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    // ✅ full window width
    const width = window.innerWidth;

    canvas.width = width;
    canvas.height = height;

    // ---- curve definition ----
    const startX = 0;
    const startY = height;

    const controlX = width / 2;
    const controlY = 20;

    const endX = width;
    const endY = height;

    // create path once
    const path = new Path2D();
    path.moveTo(startX, startY);
    path.quadraticCurveTo(controlX, controlY, endX, endY);

    // approximate path length
    const totalLength = width * 1.2;

    ctx.lineWidth = lineWidth + 4; // slightly thicker
    ctx.strokeStyle = 'rgba(253, 144, 255, 0.5)';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // transparent background → DO NOT fillRect

    let startTime: number | null = null;

    const draw = (time: number) => {
      if (!startTime) startTime = time;

      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      ctx.clearRect(0, 0, width, height);

      // drawing animation
      ctx.setLineDash([totalLength]);
      ctx.lineDashOffset = totalLength * (1 - progress);

      ctx.stroke(path);

      // stop when finished ✅
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animationRef.current);
  }, [height, color, lineWidth, duration]);

  return (
    <div className={className}>
      <canvas ref={canvasRef} style={{ width: '100%', display: 'block' }} />
    </div>
  );
}
