import create from "zustand";

const ProfileStore = create((set) => ({
  currentProfile: undefined,
  setCurrentProfile: (profile) => set({ currentProfile: profile }),
  profiles: [],
  appendProfiles: (profile) =>
    set((state) => ({ profiles: state.profiles.push(profile) })),
  clearProfiles: () => ({ profiles: [] }),
  setProfiles: (profiles) => set({ profiles: profiles }),
}));

export default ProfileStore;
