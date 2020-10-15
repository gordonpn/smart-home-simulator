package team23.smartHomeSimulator.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team23.smartHomeSimulator.model.Profile;
import team23.smartHomeSimulator.model.request_body.EditProfileRequestBody;
import team23.smartHomeSimulator.model.request_body.LocationChangeRequestBody;
import team23.smartHomeSimulator.model.request_body.ProfileRequestBody;

/** Controller for The Profile Model Class */
@RestController
@RequestMapping("/api")
public class ProfileController {

  /** Private Attribute for matching name keys and Profile values */
  private HashMap<String, Profile> profiles;

  /** Constructor for the Class */
  public ProfileController() {
    this.profiles = new HashMap<>();
  }

  /** @return the profile list */
  @GetMapping("/profile")
  public ResponseEntity<ArrayList<Profile>> getProfiles() {
    return new ResponseEntity<>(new ArrayList<>(profiles.values()), HttpStatus.OK);
  }

  /**
   * Returns a single selected profile
   *
   * @param name name of the desired profile
   * @return returns the serialised profile object
   */
  @GetMapping("/profile/single")
  public ResponseEntity<Profile> getSingleProfiles(@RequestParam(name = "name") String name) {
    return new ResponseEntity<>(profiles.get(name), HttpStatus.OK);
  }

  /**
   * Delete Method for the Profile
   *
   * @param name name of the profile to be deleted
   * @return the removed profile
   */
  @DeleteMapping("/profile")
  public ResponseEntity<Profile> deleteProfile(@RequestParam(name = "name") String name) {
    return new ResponseEntity<>(profiles.remove(name), HttpStatus.OK);
  }

  /**
   * Edit method for the Profile
   *
   * @param requestBody JSON body containing the edited data and the old name of the profile
   * @return the updated profile
   */
  @PutMapping("/profile")
  public ResponseEntity<Profile> editProfile(@RequestBody EditProfileRequestBody requestBody) {
    profiles.remove(requestBody.getOldName());
    createProfile(requestBody);
    return new ResponseEntity<>(profiles.get(requestBody.getName()), HttpStatus.OK);
  }

  /**
   * Create Method for the Profile
   *
   * @param requestBody JSON body containing the data for the new profile
   * @return the profile just created
   */
  @PostMapping("/profile")
  public ResponseEntity<Profile> createProfile(@RequestBody ProfileRequestBody requestBody) {
    profiles.put(
        requestBody.getName(),
        new Profile(
            requestBody.getName(),
            requestBody.getLocation(),
            requestBody.getRole(),
            requestBody.getPermission()));
    return new ResponseEntity<>(profiles.get(requestBody.getName()), HttpStatus.OK);
  }
}
