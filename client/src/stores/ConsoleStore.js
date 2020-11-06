import create from "zustand";

const ConsoleStore = create((set, get) => ({
  logsSHS: [],
  logsSHC: [],
  logsSHP: [],
  appendToLogsSHS: (log) => {
    const logsSHS = get().logsSHS;
    logsSHS.push(log);
    set({ logsSHS: logsSHS });
  },
  appendToLogsSHC: (log) => {
    const logsSHC = get().logsSHC;
    logsSHC.push(log);
    set({ logsSHC: logsSHC });
  },
  appendToLogsSHP: (log) => {
    const logsSHP = get().logsSHP;
    logsSHP.push(log);
    set({ logsSHP: logsSHP });
  },
}));

export default ConsoleStore;
