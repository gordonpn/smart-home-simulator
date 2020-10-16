import create from "zustand";

const HouseStore = create((set) => ({
  currentHouse: undefined,
  setHouse: (houseLayout) => set({ currentHouse: houseLayout }),
}));

export default HouseStore;