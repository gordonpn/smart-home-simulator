package team23.smartHomeSimulator.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import netscape.javascript.JSObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team23.smartHomeSimulator.model.Profile;

@RestController
@RequestMapping("/api")
/** Controller for The Profile Model Class */
public class ProfileController {
  /** Private Attribute for matching name keys and Profile values */
  private HashMap<String, Profile> allProfiles;

  /** Constructor for the Class */
  public ProfileController(
      /** Profile profile* */
      ) {
    this.allProfiles = new HashMap<>();
  }

  /**
   * Returns the list of all profiles currently registered
   *
   * @return the profile list
   */
  @GetMapping("/profile")
  public @ResponseBody List<Profile> getAllProfiles() {
    List<Profile> list = new ArrayList<Profile>(allProfiles.values());
    return list;
  }

  /**
   * Create Method for the Profile
   *
   * @param name name of the profile to be created
   * @param location location of the profile to be created
   * @param role role of the profile to be created
   * @param permission permission of the profile to be created
   */
  @PutMapping("/profile")
  public void createProfile(
      @RequestParam(name = "name") String name,
      @RequestParam(name = "location") String location,
      @RequestParam(name = "role") String role,
      @RequestParam(name = "permission") String permission) {
    allProfiles.put(name, new Profile(name, location, role, permission));
  }

  /**
   * Delete Method for the Profile
   *
   * @param name name of the profile to be deleted
   */
  @DeleteMapping("/profile")
  public void deleteProfile(@RequestParam(name = "name") String name) {
    allProfiles.remove(name);
  }

  /**
   * Edit Method for the Profile
   *
   * @param oldName name of the profile to be modified
   * @param name new name of the profile
   * @param location new location of the profile
   * @param role new role of the profile
   * @param permission new permision of the profile
   */
  @PostMapping("/profile")
  public void editProfile(
      @RequestParam(name = "oldName") String oldName,
      @RequestParam(name = "name") String name,
      @RequestParam(name = "location") String location,
      @RequestParam(name = "role") String role,
      @RequestParam(name = "permission") String permission) {
    allProfiles.get(oldName).setAll(name, location, role, permission, false);
  }
}
