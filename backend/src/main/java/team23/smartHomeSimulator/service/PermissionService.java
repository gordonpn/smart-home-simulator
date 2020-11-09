package team23.smartHomeSimulator.service;

import org.springframework.stereotype.Service;
import team23.smartHomeSimulator.model.Profile;
import team23.smartHomeSimulator.model.ProtectedAction;
import team23.smartHomeSimulator.model.Room;

/** Service to interact between Profile and House actions */
@Service
public class PermissionService {

  /**
   * Facade design pattern for checking permissions
   *
   * @param profile currently active profile
   * @param action action they want to perform
   * @param room room they want to perform the action in
   * @return boolean true for allowed, false for not allowed
   */
  public boolean isAllowed(Profile profile, ProtectedAction action, Room room) {
    switch (profile.getPermission()) {
      case PARENT:
        return parentsPermitted();
      case CHILDREN:
        return childrenPermitted(profile.getLocation(), action, room);
      case GUEST:
        return guestsPermitted(profile.getLocation(), action, room);
      case STRANGER:
        return strangersPermitted();
      default:
        return false;
    }
  }

  private boolean parentsPermitted() {
    return true;
  }

  private boolean childrenPermitted(String profileLocation, ProtectedAction action, Room room) {
    if (action == ProtectedAction.AWAY) {
      return true;
    }

    return childrenAndGuestsPermitted(profileLocation, action, room);
  }

  private boolean guestsPermitted(String profileLocation, ProtectedAction action, Room room) {
    if (action == ProtectedAction.AWAY) {
      return false;
    }

    return childrenAndGuestsPermitted(profileLocation, action, room);
  }

  private boolean strangersPermitted() {
    return false;
  }

  private boolean childrenAndGuestsPermitted(
      String profileLocation, ProtectedAction action, Room room) {
    if (action == ProtectedAction.UNLOCK_DOORS) {
      return false;
    }

    if (action == ProtectedAction.GARAGE) {
      return false;
    }

    if (!profileLocation.equalsIgnoreCase(room.getRoomName())) {
      return false;
    }

    return !profileLocation.equalsIgnoreCase("outside");
  }
}
