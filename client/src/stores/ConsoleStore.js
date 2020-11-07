import create from "zustand";

const ConsoleStore = create((set, get) => ({
  logs: [],
  appendToLogs: (log) => {
    const logs = get().logs;
    logs.push(log);
    set({ logs: logs });
  },
}));

export default ConsoleStore;
