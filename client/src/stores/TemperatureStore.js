import create from "zustand";

const TemperatureStore = create((set, get) => ({
  roomsTemps: new Map(),
  addRoomsTemps: (room, temp) => {
    const roomsTemps = get().roomsTemps;
    roomsTemps.set(room, temp);
    set({ roomsTemps: roomsTemps });
  },
  zoneIndex: 0,
  zones: new Map(),
  createZone: (rooms) => {
    const zones = get().zones;
    const zoneName = `zone${get().zoneIndex}`;
    zones.set(zoneName, rooms);
    set({ zones: zones });
    set((state) => ({ zoneIndex: state.zoneIndex + 1 }));
  },
  deleteZone: (zoneName) => {
    const zones = get().zones;
    zones.delete(zoneName);
    set({ zones: zones });
  },
  seasons: new Map([
    ["winter", { start: 0, end: 0 }],
    ["summer", { start: 0, end: 0 }],
  ]),
  setSeasons: (season, period, value) => {
    const seasons = get().seasons;
    const previousData = seasons.get(season);
    seasons.set(season, { ...previousData, [period]: value });
    set({ seasons: seasons });
  },
}));

export default TemperatureStore;
