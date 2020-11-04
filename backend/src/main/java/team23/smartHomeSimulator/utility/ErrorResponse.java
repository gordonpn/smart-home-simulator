package team23.smartHomeSimulator.utility;

import java.util.HashMap;
import java.util.Map;
import team23.smartHomeSimulator.model.Profile;
import team23.smartHomeSimulator.model.ProtectedAction;

/** Utility class to create error (Map/JSON) messages */
public final class ErrorResponse {

  /**
   * The error message when a user is not allowed to perform a certain action
   *
   * @param profile profile in question
   * @param action action they would like to perform
   * @return Map {"message": "..."}
   */
  public static Map<String, String> getErrorResponse(Profile profile, ProtectedAction action) {
    String profileName = profile == null ? "null" : profile.getName();
    HashMap<String, String> response = new HashMap<>();
    response.put(
        "message",
        String.format(
            "Profile %s is not allowed to perform actions with %s",
            profileName, action.getDescription()));
    return response;
  }
}
