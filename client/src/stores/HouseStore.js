import create from "zustand";

const HouseStore = create((set, get) => ({
  currentHouse: undefined,
  setHouse: (houseLayout) => set({ currentHouse: houseLayout }),
  currentProfile: undefined,
  setCurrentProfile: (profile) => set({ currentProfile: profile }),
  profiles: [],
  setProfiles: (profiles) => set({ profiles: profiles }),
  changeLocation: (location) =>
    set((state) => ({
      currentProfile: { ...state.currentProfile, location: location },
    })),
  removeByName: (name) => {
    const updatedProfiles = [];
    for (const profile of get().profiles) {
      if (profile.name !== name) {
        updatedProfiles.push(profile);
      }
    }
    set({ profiles: updatedProfiles });
  },
  windows: undefined,
  triggerRender: false,
  doors: undefined,
  lights: undefined,
  isAutoModeOn: false,
  setAutoMode: (autoMode) => set({ isAutoModeOn: autoMode }),
  setTriggerRender: (newState) => set({ triggerRender: newState }),
  setWindows: (windows) => set({ windows: windows }),
  currentTemperature: 15,
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
