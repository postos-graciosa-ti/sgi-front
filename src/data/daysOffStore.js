import { create } from 'zustand'

const useDaysOffStore = create((set) => ({
  daysOff: [],

  setDaysOff: (newDaysOff) => set((state) => ({ daysOff: [...state.daysOff, newDaysOff] })),

  resetDaysOff: () => set((state) => ({ daysOff: [] }))
}))

export default useDaysOffStore
