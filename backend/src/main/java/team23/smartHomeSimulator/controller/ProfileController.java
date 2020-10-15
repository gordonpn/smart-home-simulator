package team23.smartHomeSimulator.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.web.bind.annotation.*;
import team23.smartHomeSimulator.model.Profile;
import team23.smartHomeSimulator.model.request_body.EditProfileRequestBody;
import team23.smartHomeSimulator.model.request_body.ProfileRequestBody;

/** Controller for The Profile Model Class */
@RestController
@RequestMapping("/api")
public class ProfileController {

  /** Private Attribute for matching name keys and Profile values */
  private HashMap<String, Profile> allProfiles;

  /** Constructor for the Class */
  public ProfileController() {
    this.allProfiles = new HashMap<>();
  }

  /** @return the profile list */
  @GetMapping("/profile")
  public @ResponseBody List<Profile> getAllProfiles() {
    return new ArrayList<>(allProfiles.values());
  }

  /**
   * Returns a single selected profile
   *
   * @param name name of the desired profile
   * @return returns the serialised profile object
   */
  @GetMapping("/profile/single")
  public @ResponseBody Profile getSingleProfiles(@RequestParam(name = "name") String name) {
    return allProfiles.get(name);
  }

  /**
   * Create Method for the Profile
   *
   * @param requestBody SON body containing the data for the new profile
   */
  @PostMapping("/profile")
  public void createProfile(@RequestBody ProfileRequestBody requestBody) {
    allProfiles.put(
        requestBody.name,
        new Profile(
            requestBody.name, requestBody.location, requestBody.role, requestBody.permission));
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
   * Edit method for the Profile
   *
   * @param requestBody JSON body containing the edited data and the old name of the profile
   */
  @PutMapping("/profile")
  public void editProfile(@RequestBody EditProfileRequestBody requestBody) {
    allProfiles
        .get(requestBody.oldName)
        .setAll(
            requestBody.name,
            requestBody.location,
            requestBody.role,
            requestBody.permission,
            false);
  }
}
