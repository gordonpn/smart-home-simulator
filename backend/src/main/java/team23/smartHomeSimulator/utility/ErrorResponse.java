package team23.smartHomeSimulator.utility;

import team23.smartHomeSimulator.model.Profile;
import team23.smartHomeSimulator.model.ProtectedAction;

import java.util.HashMap;
import java.util.Map;

/** Utility class to create error (Map/JSON) messages */
public final class ErrorResponse {

  /** private constructor for utility classes */
  private ErrorResponse() {}

  /**
   * The error message when a user is not allowed to perform a certain action
   *
   * @param profile profile in question
   * @param action action they would like to perform
   * @return Map {"message": "..."}
   */
  public static Map<String, String> getPermissionError(Profile profile, ProtectedAction action) {
    String profileName = profile == null ? "null" : profile.getName();
    HashMap<String, String> response = new HashMap<>();
    response.put(
        "message",
        String.format(
            "Profile %s is not allowed to perform actions with %s",
            profileName, action.getDescription()));
    return response;
  }

  public static Map<String, String> getCustomError(String message) {
    HashMap<String, String> response = new HashMap<>();
    response.put("message", message);
    return response;
  }
}
