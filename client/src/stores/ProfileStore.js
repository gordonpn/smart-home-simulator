import create from "zustand";

const ProfileStore = create((set, get) => ({
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
}));

export default ProfileStore;
