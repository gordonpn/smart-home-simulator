import create from "zustand";

const HouseStore = create((set) => ({
  currentHouse: undefined,
  setHouse: (houseLayout) => set({ currentHouse: houseLayout }),
  windows: undefined,
  triggerRender: false,
  doors: undefined,
  lights: undefined,
  isAutoModeOn: false,
  setAutoMode: (autoMode) => set({ isAutoModeOn: autoMode }),
  setTriggerRender: (newState) => set({ triggerRender: newState }),
  setWindows: (windows) => set({ windows: windows }),
  currentTemperature: undefined,
  setTemperature: (newTemperature) =>
    set({ currentTemperature: newTemperature }),
  setDoors: (doors) => set({ doors: doors }),
  setLights: (lights) => set({ lights: lights }),
  delay: 0,
  setDelay: (delay) => set({ delay: delay }),
  awayMode: false,
  setAwayMode: (awayMode) => set({ awayMode: awayMode }),
}));

export default HouseStore;
