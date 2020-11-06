package team23.smartHomeSimulator.model.repository;

import java.util.ArrayList;
import java.util.List;
import team23.smartHomeSimulator.model.Permission;
import team23.smartHomeSimulator.model.Profile;
import team23.smartHomeSimulator.model.request_body.EditProfileRequestBody;
import team23.smartHomeSimulator.model.request_body.LocationChangeRequestBody;

public class ProfileRepository {
  private List<Profile> profiles;

  public ProfileRepository() {
    this.profiles = new ArrayList<>();
  }

  public ProfileRepository(List<Profile> profiles) {
    this.profiles = profiles;
  }

  public List<Profile> getProfiles() {
    return profiles;
  }

  public void setProfiles(List<Profile> profiles) {
    this.profiles = profiles;
  }

  public Profile findByName(String name) {
    for (Profile profile : profiles) {
      if (profile.getName().equalsIgnoreCase(name)) {
        return profile;
      }
    }
    return null;
  }

  public Profile modify(EditProfileRequestBody requestBody) {
    Permission permission = Permission.valueOf(requestBody.getPermission().toUpperCase());
    if (removeByName(requestBody.getOldName()) != null) {
      return add(
          new Profile(
              requestBody.getName(), requestBody.getLocation(), requestBody.getRole(), permission));
    }
    return null;
  }

  public Profile removeByName(String name) {
    int idx = 0;
    while (idx < profiles.size()) {
      if (profiles.get(idx).getName().equalsIgnoreCase(name)) {
        return profiles.remove(idx);
      } else {
        ++idx;
      }
    }
    return null;
  }

  public Profile add(Profile profile) {
    for (Profile thisProfile : profiles) {
      if (thisProfile.getName().equalsIgnoreCase(profile.getName())) {
        return null;
      }
    }
    profiles.add(profile);
    return profile;
  }

  public boolean login(String name) {
    for (Profile profile : profiles) {
      if (profile.getName().equalsIgnoreCase(name)) {
        profile.setActive(true);
        return true;
      }
    }
    return false;
  }

  public void logout() {
    for (Profile profile : profiles) {
      profile.setActive(false);
    }
  }

  public Profile getActiveProfile() {
    for (Profile profile : profiles) {
      if (profile.isActive()) {
        return profile;
      }
    }
    return null;
  }

  public Profile updateLocation(LocationChangeRequestBody requestBody) {
    for (Profile profile : profiles) {
      if (profile.getName().equalsIgnoreCase(requestBody.getName())) {
        profile.setLocation(requestBody.getLocation());
        return profile;
      }
    }
    return null;
  }
}
