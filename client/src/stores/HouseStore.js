import create from "zustand";

const HouseStore = create((set) => ({
  currentHouse: undefined,
  setHouse: (houseLayout) => set({ currentHouse: houseLayout }),
  windows: undefined,
  triggerRender: false,
  doors:undefined,
  lights:undefined,
  setTriggerRender: (newState) => set({ triggerRender: newState }),
  setWindows: (windows) => set({ windows: windows }),
  currentTemperature: undefined,
  setTemperature: (newTemperature) =>
    set({ currentTemperature: newTemperature }),
  setDoors: (doors) => set({ doors: doors }),
  setLights: (lights) => set({ lights: lights }),

}));

export default HouseStore;
