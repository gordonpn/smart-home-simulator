package team23.smartHomeSimulator.utility;

import java.util.HashMap;
import java.util.Map;
import team23.smartHomeSimulator.model.Profile;
import team23.smartHomeSimulator.model.ProtectedAction;

public final class ErrorResponse {
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
