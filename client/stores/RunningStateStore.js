import create from "zustand";

const RunningStateStore = create((set) => ({
  currentState: false,
  toggleState: () => set((state) => ({ currentState: !state.currentState })),
  setRunningState: (newRunningState) => set({ currentState: newRunningState }),
}));

export default RunningStateStore;
