import { useAppStore } from '@/store/useAppStore'
import ChatPanel from '@/components/ChatPanel'

export default function Dashboard() {
  const theme = useAppStore((state) => state.theme)
  const chartConfig = useAppStore((state) => state.chartConfig)
  const isLoading = useAppStore((state) => state.isLoading)
  const error = useAppStore((state) => state.error)

  return (
    <div
      style={{
        background: theme === 'dark' ? '#1a1a1a' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
        minHeight: '100%',
        borderRadius: 8,
        padding: 20,
      }}
    >
      <ChatPanel />

      <div style={{ marginTop: 30 }}>
        <h2>图表展示区</h2>
        {isLoading && <p>加载中...</p>}
        {error && <p style={{ color: 'red' }}>错误: {error}</p>}
        {chartConfig && (
          <div>
            <p>图表类型: {chartConfig.type}</p>
            <pre>{JSON.stringify(chartConfig.data, null, 2)}</pre>
          </div>
        )}
        {!chartConfig && !isLoading && !error && (
          <p>请在输入框中输入需求，例如“显示近三月销售趋势”</p>
        )}
      </div>
    </div>
  )
}