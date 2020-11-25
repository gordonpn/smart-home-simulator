import create from "zustand";

const SHPStore = create((set, get) => ({
  awayMode: false,
  setAwayMode: (awayMode) => set({ awayMode: awayMode }),
  delay: 0,
  setDelay: (delay) => set({ delay: delay }),
}));

export default SHPStore;
