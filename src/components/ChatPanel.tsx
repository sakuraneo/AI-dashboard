import { useState } from 'react'
import { useAppStore } from '@/store/useAppStore'

export default function ChatPanel() {
  const [input, setInput] = useState('')
  const setQuery = useAppStore((state) => state.setQuery)
  const setLoading = useAppStore((state) => state.setLoading)
  const setChartConfig = useAppStore((state) => state.setChartConfig)
  const setError = useAppStore((state) => state.setError)

  const handleSend = () => {
    if (!input.trim()) return
    setQuery(input)
    setLoading(true)
    setError(null)

    // 模拟异步生成图表
    setTimeout(() => {
      // 模拟返回
      if (input.includes('销售')) {
        setChartConfig({
          type: 'bar',
          data: {
            months: ['1月', '2月', '3月'],
            sales: [120, 200, 150],
          },
        })
      } else {
        setError('无法理解您的需求，请尝试输入“销售趋势”')
      }
    }, 1000)
  }

  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="输入需求，如“显示近三月销售趋势”"
        style={{ flex: 1, padding: '8px 12px' }}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend}>发送</button>
    </div>
  )
}