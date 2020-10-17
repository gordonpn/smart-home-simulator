import create from "zustand";

const HouseStore = create((set) => ({
  currentHouse: undefined,
  setHouse: (houseLayout) => set({ currentHouse: houseLayout }),
  currentTemperature: undefined,
  setTemperature: (newTemperature) =>
    set({ currentTemperature: newTemperature }),
}));

export default HouseStore;
