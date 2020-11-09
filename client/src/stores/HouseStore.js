import create from "zustand";

const HouseStore = create((set, get) => ({
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
  lightsSchedule: new Map(),
  addLightsSchedule: (lightName, schedule) => {
    const lightsSchedule = get().lightsSchedule;
    lightsSchedule.set(lightName, schedule);
  },
}));

export default HouseStore;
