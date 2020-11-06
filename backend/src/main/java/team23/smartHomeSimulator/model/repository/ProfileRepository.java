package team23.smartHomeSimulator.model.repository;

import team23.smartHomeSimulator.model.Permission;
import team23.smartHomeSimulator.model.Profile;
import team23.smartHomeSimulator.model.request_body.EditProfileRequestBody;
import team23.smartHomeSimulator.model.request_body.LocationChangeRequestBody;

import java.util.ArrayList;
import java.util.List;

/** Represents a repository pattern class to access profiles */
public class ProfileRepository {
  private List<Profile> profiles;

  /** Default constructor */
  public ProfileRepository() {
    this.profiles = new ArrayList<>();
  }

  /**
   * Parametrized constructor
   *
   * @param profiles Existing list of profiles
   */
  public ProfileRepository(List<Profile> profiles) {
    this.profiles = profiles;
  }

  /**
   * Getter for profiles list
   *
   * @return list of profiles
   */
  public List<Profile> getProfiles() {
    return profiles;
  }

  /**
   * Setter for profiles list
   *
   * @param profiles set list of profiles
   */
  public void setProfiles(List<Profile> profiles) {
    this.profiles = profiles;
  }

  /**
   * Find a profile by the user's name
   *
   * @param name name to lookup
   * @return profile if it exists, or null
   */
  public Profile findByName(String name) {
    for (Profile profile : profiles) {
      if (profile.getName().equalsIgnoreCase(name)) {
        return profile;
      }
    }
    return null;
  }

  /**
   * Modify a profile given the request body
   *
   * @param requestBody EditProfileRequestBody
   * @return modified profile, or null if not found
   */
  public Profile modify(EditProfileRequestBody requestBody) {
    Permission permission = Permission.valueOf(requestBody.getPermission().toUpperCase());
    if (removeByName(requestBody.getOldName()) != null) {
      return add(
          new Profile(
              requestBody.getName(), requestBody.getLocation(), requestBody.getRole(), permission));
    }
    return null;
  }

  /**
   * Remove a profile by the user's name
   *
   * @param name name to lookup and delete
   * @return deleted profile or null if not found
   */
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

  /**
   * Add a profile to the list of profiles
   *
   * @param profile new profile to add
   * @return newly created profile
   */
  public Profile add(Profile profile) {
    for (Profile thisProfile : profiles) {
      if (thisProfile.getName().equalsIgnoreCase(profile.getName())) {
        thisProfile.setName(profile.getName());
        thisProfile.setLocation(profile.getLocation());
        thisProfile.setRole(profile.getRole());
        thisProfile.setPermission(profile.getPermission());
        return thisProfile;
      }
    }
    profiles.add(profile);
    return profile;
  }

  /**
   * login (set as active) a profile given user's name
   *
   * @param name name to login
   * @return success status
   */
  public boolean login(String name) {
    for (Profile profile : profiles) {
      if (profile.getName().equalsIgnoreCase(name)) {
        profile.setActive(true);
        return true;
      }
    }
    return false;
  }

  /** logout (set all inactive) all profiles */
  public void logout() {
    for (Profile profile : profiles) {
      profile.setActive(false);
    }
  }

  /**
   * Return the active profile
   *
   * @return the active profile
   */
  public Profile getActiveProfile() {
    for (Profile profile : profiles) {
      if (profile.isActive()) {
        return profile;
      }
    }
    return null;
  }

  /**
   * Update the location of a profile
   *
   * @param requestBody LocationChangeRequestBody
   * @return the modified profile or null if not found
   */
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
