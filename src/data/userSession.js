import { create } from 'zustand'

const useUserSessionStore = create((set) => ({
  userSession: {},

  selectedUser: {},

  userFormData: {},

  userList: [],

  selectedSubsdiarie: {},

  jobsList: [],

  selectedJob: {},

  workersList: [],

  selectedCandidate: {},

  bearerToken: "",

  setUserSession: (newUserSession) => set(() => ({ userSession: newUserSession })),

  resetState: () => set(() => ({ userSession: {} })),

  setSelectedUser: (newSelectedUser) => set(() => ({ selectedUser: newSelectedUser })),

  setUserFormData: (newUserFormData) => set(() => ({ userFormData: newUserFormData })),

  setUserList: (newUserList) => set(() => ({ userList: newUserList })),

  setSelectedSubsidiarie: (newSelectedSubsidiarie) => set(() => ({ selectedSubsdiarie: newSelectedSubsidiarie })),

  setJobsList: (newJobsList) => set(() => ({ jobsList: newJobsList })),

  setSelectedJob: (newSelectedJob) => set(() => ({ selectedJob: newSelectedJob })),

  setWorkersList: (newWorkersList) => set(() => ({ workersList: newWorkersList })),

  setSelectedCandidate: (newCandidate) => set(() => ({ selectedCandidate: newCandidate })),

  setBearerToken: (newToken) => set(() => ({ bearerToken: newToken })),
}))

export default useUserSessionStore