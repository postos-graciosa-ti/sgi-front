import { create } from 'zustand'

const useCitiesStateStore = create((set) => ({
  cities: [],

  states: [],

  setCities: (newCities) => set(() => ({ cities: newCities })),

  setStates: (newStates) => set(() => ({ states: newStates })),
}))

export default useCitiesStateStore
