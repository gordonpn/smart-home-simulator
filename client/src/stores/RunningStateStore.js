import create from "zustand";

const RunningStateStore = create((set) => ({
  currentState: false,
  setRunningState: (newRunningState) => set({ currentState: newRunningState }),
  activeTab: 0,
  setActiveTab: (newActiveTab) => set({ activeTab: newActiveTab }),
  currentTime: new Date(),
  setCurrentTime: (newCurrentTime) => set({ currentTime: newCurrentTime }),
  timeSpeed: 1,
  setTimeSpeed: (newTimeSpeed) => set({ timeSpeed: newTimeSpeed }),
}));

export default RunningStateStore;
