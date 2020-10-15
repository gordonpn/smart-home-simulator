package team23.smartHomeSimulator.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.web.bind.annotation.*;
import team23.smartHomeSimulator.model.Profile;

@RestController
@RequestMapping("/api")
/** Controller for The Profile Model Class */
public class ProfileController {

  /** Class Used for Creating Profiles having the parameters as a template for the recieved JSON */
  private class ProfileResponseBody {
    public String name;
    public String location;
    public String role;
    public String permission;

    public ProfileResponseBody(String name, String location, String role, String permission) {
      this.name = name;
      this.location = location;
      this.role = role;
      this.permission = permission;
    }
  }

  /**
   * Class Used for Editing the profile with same parameters as the ProfileResponseBody class but
   * with oldName as extra parameter parameters are the template for the recieved JSON
   */
  private class EditProfileResponseBody {
    public String oldName;
    public String name;
    public String location;
    public String role;
    public String permission;

    public EditProfileResponseBody(
        String oldName, String name, String location, String role, String permission) {
      this.oldName = oldName;
      this.name = name;
      this.location = location;
      this.role = role;
      this.permission = permission;
    }
  }

  /** Private Attribute for matching name keys and Profile values */
  private HashMap<String, Profile> allProfiles;

  /** Constructor for the Class */
  public ProfileController() {
    this.allProfiles = new HashMap<>();
  }

  /** @return the profile list */
  @GetMapping("/profile")
  public @ResponseBody List<Profile> getAllProfiles() {
    List<Profile> list = new ArrayList<Profile>(allProfiles.values());
    return list;
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
  public void createProfile(@RequestBody ProfileResponseBody requestBody) {
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
  public void editProfile(@RequestBody EditProfileResponseBody requestBody) {
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
