import create from "zustand";

const SHHStore = create((set, get) => ({
  roomsTemps: new Map(),
  addRoomsTemps: (room, temp) => {
    const roomsTemps = get().roomsTemps;
    roomsTemps.set(room, temp);
    set({ roomsTemps: roomsTemps });
  },
  isSummer: undefined,
  setIsSummer: (isSummer)=>set({isSummer:isSummer}),
  isWinter: undefined,
  setIsWinter: (isWinter)=>set({isWinter:isWinter}),
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
    ["winter", { start: 12, end: 4, temperature: 20 }],
    ["summer", { start: 6, end: 9, temperature: 10 }],
  ]),
  setSeasons: (season, prop, value) => {
    const seasons = get().seasons;
    const previousData = seasons.get(season);
    seasons.set(season, { ...previousData, [prop]: value });
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
