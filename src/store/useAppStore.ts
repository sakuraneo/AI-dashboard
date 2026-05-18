import { create } from 'zustand'

interface ChartConfig {
  type: string
  data: any
}

interface AppState {
  theme: 'light' | 'dark'
  query: string
  chartConfig: ChartConfig | null
  isLoading: boolean
  error: string | null
  setTheme: (theme: 'light' | 'dark') => void
  setQuery: (query: string) => void
  setChartConfig: (config: ChartConfig | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  query: '',
  chartConfig: null,
  isLoading: false,
  error: null,
  setTheme: (theme) => set({ theme }),
  setQuery: (query) => set({ query }),
  setChartConfig: (config) => set({ chartConfig: config, isLoading: false, error: null }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error, isLoading: false }),
}))