import create from "zustand";

const ProfileStore = create((set) => ({
  currentProfile: undefined,
}));

export default ProfileStore;
