import create from "zustand";

const RunningStateStore = create((set) => ({
  currentState: false,
  setRunningState: (newRunningState) => set({ currentState: newRunningState }),
}));

export default RunningStateStore;
