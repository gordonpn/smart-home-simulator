import create from "zustand";

const TemperatureStore = create((set, get) => ({
  roomsTemps: new Map(),
  addRoomsTemps: (room, temp) => {
    const roomsTemps = get().roomsTemps;
    roomsTemps.set(room, temp);
    set({ roomsTemps: roomsTemps });
  },
}));

export default TemperatureStore;
