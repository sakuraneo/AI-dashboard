import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface ChartCardProps {
  option: echarts.EChartsOption;
  style?: React.CSSProperties;
}

function ChartCard({ option, style }: ChartCardProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // 初始化实例（option 由下方 effect 更新）
    const instance = echarts.init(chartRef.current);
    instanceRef.current = instance;

    // 窗口大小变化时自动 resize
    const handleResize = () => {
      instance.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      instance.dispose(); // 销毁实例，释放资源
      instanceRef.current = null;
    };
  }, []); // 仅在挂载时执行

  // 当 option 变化时更新图表
  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.setOption(option, true); // 优化：notMerge=true 避免合并问题
    }
  }, [option]);

  return <div ref={chartRef} style={{ width: '100%', height: 400, ...style }} />;
}

// 使用 React.memo 避免不必要的重渲染
export default ChartCard;
