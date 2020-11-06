package team23.smartHomeSimulator.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team23.smartHomeSimulator.model.Permission;
import team23.smartHomeSimulator.model.Profile;
import team23.smartHomeSimulator.model.request_body.EditProfileRequestBody;
import team23.smartHomeSimulator.model.request_body.LocationChangeRequestBody;
import team23.smartHomeSimulator.model.request_body.ProfileRequestBody;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.HashMap;

/** Controller for The Profile Model Class */
@RestController
@RequestMapping("/api")
public class ProfileController {

  private static Profile activeProfile;
  private HashMap<String, Profile> profiles;

  /** Constructor for the Class, instantiates an empty hashmap */
  public ProfileController() {
    this.profiles = new HashMap<>();
  }

  /**
   * Static method to get the current active profile
   *
   * @return Profile that is active
   */
  public static Profile getActiveProfile() {
    return activeProfile;
  }

  /**
   * get all the profiles create
   *
   * @return the profile list
   */
  @GetMapping("/profiles")
  public ResponseEntity<ArrayList<Profile>> getProfiles() {
    return new ResponseEntity<>(new ArrayList<>(profiles.values()), HttpStatus.OK);
  }

  /**
   * get a specific profile given the name
   *
   * @param name of the profile we want
   * @return the profile in question
   */
  @GetMapping("/profiles/{name}")
  public ResponseEntity<Profile> getOneProfile(@PathVariable String name) {
    return new ResponseEntity<>(profiles.get(name.toLowerCase()), HttpStatus.OK);
  }

  /**
   * Delete Method for the Profile
   *
   * @param name name of the profile to be deleted
   * @return the removed profile
   */
  @DeleteMapping("/profiles")
  public ResponseEntity<Profile> deleteProfile(@RequestParam(name = "name") String name) {
    return new ResponseEntity<>(profiles.remove(name.toLowerCase()), HttpStatus.OK);
  }

  /**
   * Edit method for the Profile
   *
   * @param requestBody JSON body containing the edited data and the old name of the profile
   * @return the updated profile
   */
  @PutMapping("/profiles")
  public ResponseEntity<Profile> editProfile(@RequestBody EditProfileRequestBody requestBody) {
    profiles.remove(requestBody.getOldName().toLowerCase());
    createProfile(requestBody);
    return new ResponseEntity<>(profiles.get(requestBody.getName().toLowerCase()), HttpStatus.OK);
  }

  /**
   * Create Method for the Profile
   *
   * @param requestBody JSON body containing the data for the new profile
   * @return the profile just created
   */
  @PostMapping("/profiles")
  public ResponseEntity<Profile> createProfile(@RequestBody ProfileRequestBody requestBody) {
    Permission permission = Permission.valueOf(requestBody.getPermission().toUpperCase());
    Profile newProfile =
        new Profile(
            requestBody.getName(), requestBody.getLocation(), requestBody.getRole(), permission);
    profiles.put(requestBody.getName().toLowerCase(), newProfile);
    return new ResponseEntity<>(profiles.get(requestBody.getName().toLowerCase()), HttpStatus.OK);
  }

  /**
   * set a specific profile as active given the name
   *
   * @param name of the profile we'd like to login
   * @return all profiles after logging in
   */
  @PutMapping("/profiles/login")
  public ResponseEntity<ArrayList<Profile>> setActive(@RequestParam(name = "name") String name) {
    Profile profile = profiles.get(name.toLowerCase());
    profile.setActive(true);
    activeProfile = profile;
    return new ResponseEntity<>(new ArrayList<>(profiles.values()), HttpStatus.OK);
  }

  /**
   * set all profiles as inactive
   *
   * @return all profiles after logging out
   */
  @PutMapping("/profiles/logout")
  public ResponseEntity<ArrayList<Profile>> setInactive() {
    profiles.forEach((profileName, profile) -> profile.setActive(false));
    activeProfile = null;
    return new ResponseEntity<>(new ArrayList<>(profiles.values()), HttpStatus.OK);
  }

  /**
   * updates the location of one profile
   *
   * @param requestBody containing name and new location
   * @return the updated profile
   */
  @PutMapping("/profiles/location")
  public ResponseEntity<Profile> changeLocation(
      @RequestBody LocationChangeRequestBody requestBody) {
    profiles.get(requestBody.getName().toLowerCase()).setLocation(requestBody.getLocation());
    return new ResponseEntity<>(profiles.get(requestBody.getName().toLowerCase()), HttpStatus.OK);
  }

  /**
   * Return all available permissions
   *
   * @return list of permissions
   */
  @GetMapping("/profiles/permissions")
  public ResponseEntity<ArrayList<String>> getPermissions() {
    ArrayList<String> permissions = new ArrayList<>();
    EnumSet.allOf(Permission.class).forEach(permission -> permissions.add(permission.getType()));
    return new ResponseEntity<>(permissions, HttpStatus.OK);
  }

  /**
   * Saves profiles to a file named profiles.json
   *
   * @return an HTTP response
   */
  @GetMapping("/profiles/save")
  public ResponseEntity<Object> saveToFile() {
    HashMap<String, String> response = new HashMap<>();
    String fileName = "profiles.json";
    try {
      new ObjectMapper().writeValue(new File(fileName), profiles);
    } catch (IOException e) {
      response.put("message", String.format("An error has occurred while saving %s", fileName));
      response.put("error", e.toString());
      return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    response.put("message", String.format("Saved as %s", fileName));
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @GetMapping("/profiles/load")
  public ResponseEntity<Object> loadFromFile() {
    HashMap<String, String> response = new HashMap<>();
    String fileName = "profiles.json";
    try {
      ObjectMapper mapper = new ObjectMapper();
      mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
      profiles.setProfiles(
          mapper.readValue(new File(fileName), ProfileRepository.class).getProfiles());
    } catch (IOException e) {
      response.put("message", "An error occurred while reading from file");
      response.put("error", e.toString());
      return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    response.put("message", "Successfully loaded from file");
    return new ResponseEntity<>(response, HttpStatus.OK);
  }
}
