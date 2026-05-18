import { useAppStore } from '@/store/useAppStore'

export default function Sidebar() {
  const theme = useAppStore((state) => state.theme)
  const setTheme = useAppStore((state) => state.setTheme)

  return (
    <aside
      style={{
        width: 200,
        background: theme === 'dark' ? '#333' : '#f0f0f0',
        color: theme === 'dark' ? '#fff' : '#000',
        padding: 20,
        transition: 'all 0.3s',
      }}
    >
      <h3>导航</h3>
      <ul>
        <li>仪表盘</li>
        <li>历史记录</li>
      </ul>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        切换主题
      </button>
    </aside>
  )
}