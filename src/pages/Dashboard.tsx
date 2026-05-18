import { useMemo } from 'react'
import { useAppStore } from '@/store/useAppStore'
import ChatPanel from '@/components/ChatPanel'
import ChartCard from '@/components/ChartCard'
import CanvasBackground from '@/components/CanvasBackground'
import type { EChartsOption } from 'echarts'

export default function Dashboard() {
  const theme = useAppStore((state) => state.theme)
  const chartConfig = useAppStore((state) => state.chartConfig)
  const isLoading = useAppStore((state) => state.isLoading)
  const error = useAppStore((state) => state.error)

  // 将 chartConfig 转换为 ECharts 的 option 对象
  const chartOption: EChartsOption | null = useMemo(() => {
    if (!chartConfig) return null
    // 简单适配：根据配置类型生成图表 option
    if (chartConfig.type === 'bar') {
      return {
        title: { text: '销售趋势', left: 'center' },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: chartConfig.data.months || [],
        },
        yAxis: { type: 'value' },
        series: [
          {
            name: '销售额',
            type: 'bar',
            data: chartConfig.data.sales || [],
          },
        ],
      }
    }
    // 可以扩展更多类型
    return null
  }, [chartConfig])

  return (
    <div
      style={{
        background: theme === 'dark' ? '#1a1a1a' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
        minHeight: '100%',
        borderRadius: 8,
        padding: 20,
        position: 'relative',
      }}
    >
      {/* 粒子背景 */}
      <CanvasBackground />

      <ChatPanel />

      <div style={{ marginTop: 30 }}>
        <h2>图表展示区</h2>
        {isLoading && <p>加载中...</p>}
        {error && <p style={{ color: 'red' }}>错误: {error}</p>}
        {chartOption && <ChartCard option={chartOption} />}
        {!chartOption && !isLoading && !error && (
          <p>请在输入框中输入需求，例如“显示近三月销售趋势”</p>
        )}
      </div>
    </div>
  )
}