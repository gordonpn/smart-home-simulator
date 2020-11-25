import create from "zustand";

const SHHStore = create((set, get) => ({
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
  zonesTemps: new Map(),
  addZonesTemps: (zoneName, period, temp) => {
    const zones = get().zonesTemps;
    let thisZoneTemps = zones.get(zoneName);
    if (thisZoneTemps === undefined) {
      thisZoneTemps = new Map();
    }
    thisZoneTemps.set(period, temp);
    zones.set(zoneName, thisZoneTemps);
    set({ zonesTemps: zones });
  },
}));

export default SHHStore;
