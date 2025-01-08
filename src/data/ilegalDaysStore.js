import { create } from 'zustand'

const ilegalDaysStore = create((set) => ({
  ilegalDays: [],

  setIlegalDays: (newIlegalDay) => set((state) => ({ ilegalDays: [...state.ilegalDays, newIlegalDay] })),
}))

export default ilegalDaysStore
