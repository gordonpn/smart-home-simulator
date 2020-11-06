import create from "zustand";

const RunningStateStore = create((set) => ({
  currentState: false,
  setRunningState: (newRunningState) => set({ currentState: newRunningState }),
  activeTab: 0,
  setActiveTab: (newActiveTab) => set({ activeTab: newActiveTab }),
}));

export default RunningStateStore;
