import create from "zustand";

const TemperatureStore = create((set, get) => ({
  roomsTemps: new Map(),
  addRoomsTemps: (room, temp) => {
    const roomsTemps = get().roomsTemps;
    roomsTemps.set(room, temp);
    set({ roomsTemps: roomsTemps });
  },
  zones: new Map(),
  createZone: (rooms) => {
    const zones = get().zones;
    const zoneName = `zone${zones.size}`;
    zones.set(zoneName, rooms);
    set({ zones: zones });
  },
  deleteZone: (zoneName) => {
    const zones = get().zones;
    zones.delete(zoneName);
    set({ zones: zones });
  },
}));

export default TemperatureStore;
