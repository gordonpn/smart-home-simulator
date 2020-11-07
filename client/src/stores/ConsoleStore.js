import create from "zustand";
import axios from "axios";

const ConsoleStore = create((set, get) => ({
  logs: [],
  appendToLogs: (log) => {
    const logs = get().logs;
    logs.push(log);
    set({ logs: logs });
    const postBody = {
      timestamp: log.timestamp,
      message: log.message,
      module: log.module,
    };
    axios.post("/api/logs/save", postBody);
  },
}));

export default ConsoleStore;
