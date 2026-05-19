import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';

export default function CanvasOffscreenDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useAppStore((state) => state.theme);
  const animationIdRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // DPR 适配
    const dpr = window.devicePixelRatio || 1;
    const w = 600;
    const h = 200;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // ========== 离屏 Canvas：绘制文字并获取像素数据 ==========
    const offscreen = document.createElement('canvas');
    offscreen.width = w;
    offscreen.height = h;
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return;

    // 在离屏 Canvas 上绘制文字
    offCtx.fillStyle = '#ffffff';
    offCtx.font = 'bold 60px Arial';
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillText('AI DASHBOARD', w / 2, h / 2);

    // 获取像素数据：ImageData 包含 width、height 和 data（RGBA 数组）
    const imageData = offCtx.getImageData(0, 0, w, h);
    const pixels: { x: number; y: number }[] = [];

    // 每隔 3 个像素采样一次（提高性能，减少粒子数量）
    for (let y = 0; y < h; y += 3) {
      for (let x = 0; x < w; x += 3) {
        const index = (y * w + x) * 4;
        // alpha > 128 表示该像素有文字
        if (imageData.data[index + 3] > 128) {
          pixels.push({ x, y });
        }
      }
    }

    // 给每个像素点创建一个粒子（带随机偏移）
    interface Particle {
      targetX: number;
      targetY: number;
      x: number;
      y: number;
      size: number;
    }

    const particles: Particle[] = pixels.map((p) => ({
      targetX: p.x,
      targetY: p.y,
      x: Math.random() * w, // 初始随机位置
      y: Math.random() * h,
      size: Math.random() * 2 + 1,
    }));

    // 动画循环：粒子从随机位置逐渐飞向目标文字位置
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const color = theme === 'dark' ? 'rgba(100, 200, 255, 0.8)' : 'rgba(50, 100, 200, 0.8)';

      for (const p of particles) {
        // 缓动移动：每次向目标靠近 5%
        p.x += (p.targetX - p.x) * 0.05;
        p.y += (p.targetY - p.y) * 0.05;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationIdRef.current);
    };
  }, [theme]);

  return <canvas ref={canvasRef} style={{ display: 'block', margin: '0 auto' }} />;
}
