import { create } from 'zustand'

const useWorkersExperienceTimeStore = create((set) => ({
  workersFirstReview: [],

  workersSecondReview: [],

  setWorkersFirstReview: (newWorkersFirstReview) => set(() => ({ workersFirstReview: newWorkersFirstReview })),

  setWorkersSecondReview: (newWorkersSecondReview) => set(() => ({ workersSecondReview: newWorkersSecondReview })),
}))

export default useWorkersExperienceTimeStore