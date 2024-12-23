import { create } from 'zustand'

const useDaysOffStore = create((set) => ({
  daysOff: [],

  daysOffToRemove: [],

  setDaysOff: (newDaysOff) => set((state) => ({ daysOff: [...state.daysOff, newDaysOff] })),

  removeDayOff: (dayToRemove) => set((state) => ({ 
    daysOff: state.daysOff.filter(day => day !== dayToRemove),
    
    daysOffToRemove: [...state.daysOffToRemove, dayToRemove]
  })),

  resetDaysOff: () => set((state) => ({ daysOff: [] }))
}))

export default useDaysOffStore
