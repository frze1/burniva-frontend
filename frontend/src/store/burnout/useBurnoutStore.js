import { create } from 'zustand'

const useBurnoutStore = create((set) => ({
  lastResult: JSON.parse(localStorage.getItem('lastResult') || 'null'),
  inputData:  null,
  history:    [],

  setResult: (result) => {
    localStorage.setItem('lastResult', JSON.stringify(result))
    set({ lastResult: result })
  },

  setInputData: (data) => set({ inputData: data }),
  setHistory:   (history) => set({ history }),

  clearResult: () => {
    localStorage.removeItem('lastResult')
    set({ lastResult: null })
  },
}))

export default useBurnoutStore