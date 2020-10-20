import create from "zustand";

const HouseStore = create((set) => ({
  currentHouse: undefined,
  setHouse: (houseLayout) => set({ currentHouse: houseLayout }),
  windows: undefined,
  triggerRender: false,
  setTriggerRender: (newState) => set({ triggerRender: newState }),
  setWindows: (windows) => set({ windows: windows }),
  currentTemperature: undefined,
  setTemperature: (newTemperature) =>
    set({ currentTemperature: newTemperature }),
}));

export default HouseStore;
