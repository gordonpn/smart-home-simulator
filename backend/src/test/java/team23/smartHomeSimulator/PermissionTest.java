package team23.smartHomeSimulator;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import team23.smartHomeSimulator.model.Permission;
import team23.smartHomeSimulator.model.Profile;
import team23.smartHomeSimulator.model.ProtectedAction;
import team23.smartHomeSimulator.model.Room;
import team23.smartHomeSimulator.service.PermissionService;

@SpringBootTest
public class PermissionTest {

  @SpyBean private PermissionService permissionService;

  @Test
  public void parentsPermissionTest() throws Exception {
    Profile parent = new Profile("Gordon", "kitchen", "role", Permission.PARENT);
    Room livingRoom = new Room("01", "living room", 1, 1, 1);
    assertThat(permissionService.isAllowed(parent, ProtectedAction.AWAY, livingRoom), is(true));
    assertThat(permissionService.isAllowed(parent, ProtectedAction.GARAGE, livingRoom), is(true));
    assertThat(permissionService.isAllowed(parent, ProtectedAction.LIGHTS, livingRoom), is(true));
    assertThat(
        permissionService.isAllowed(parent, ProtectedAction.UNLOCK_DOORS, livingRoom), is(true));
    assertThat(permissionService.isAllowed(parent, ProtectedAction.WINDOWS, livingRoom), is(true));
  }

  @Test
  public void strangersPermissionTest() throws Exception {
    Profile stranger = new Profile("Gordon", "living room", "role", Permission.STRANGER);
    Room livingRoom = new Room("01", "living room", 1, 1, 1);
    assertThat(permissionService.isAllowed(stranger, ProtectedAction.AWAY, livingRoom), is(false));
    assertThat(
        permissionService.isAllowed(stranger, ProtectedAction.GARAGE, livingRoom), is(false));
    assertThat(
        permissionService.isAllowed(stranger, ProtectedAction.LIGHTS, livingRoom), is(false));
    assertThat(
        permissionService.isAllowed(stranger, ProtectedAction.UNLOCK_DOORS, livingRoom), is(false));
    assertThat(
        permissionService.isAllowed(stranger, ProtectedAction.WINDOWS, livingRoom), is(false));
  }

  @Test
  public void childrenPermissionTest() throws Exception {
    Profile child = new Profile("Gordon", "living room", "role", Permission.CHILDREN);
    Room livingRoom = new Room("01", "living room", 1, 1, 1);
    assertThat(permissionService.isAllowed(child, ProtectedAction.AWAY, livingRoom), is(true));
    assertThat(permissionService.isAllowed(child, ProtectedAction.GARAGE, livingRoom), is(false));
    assertThat(permissionService.isAllowed(child, ProtectedAction.LIGHTS, livingRoom), is(true));
    assertThat(
        permissionService.isAllowed(child, ProtectedAction.UNLOCK_DOORS, livingRoom), is(false));
    assertThat(permissionService.isAllowed(child, ProtectedAction.WINDOWS, livingRoom), is(true));
    child.setLocation("kitchen");
    assertThat(permissionService.isAllowed(child, ProtectedAction.LIGHTS, livingRoom), is(false));
    assertThat(permissionService.isAllowed(child, ProtectedAction.WINDOWS, livingRoom), is(false));
    child.setLocation("outside");
    assertThat(permissionService.isAllowed(child, ProtectedAction.LIGHTS, livingRoom), is(false));
    assertThat(permissionService.isAllowed(child, ProtectedAction.WINDOWS, livingRoom), is(false));
  }

  @Test
  public void guestsPermissionTest() throws Exception {
    Profile guest = new Profile("Gordon", "living room", "role", Permission.GUEST);
    Room livingRoom = new Room("01", "living room", 1, 1, 1);
    assertThat(permissionService.isAllowed(guest, ProtectedAction.AWAY, livingRoom), is(false));
    assertThat(permissionService.isAllowed(guest, ProtectedAction.GARAGE, livingRoom), is(false));
    assertThat(permissionService.isAllowed(guest, ProtectedAction.LIGHTS, livingRoom), is(true));
    assertThat(
        permissionService.isAllowed(guest, ProtectedAction.UNLOCK_DOORS, livingRoom), is(false));
    assertThat(permissionService.isAllowed(guest, ProtectedAction.WINDOWS, livingRoom), is(true));
    guest.setLocation("kitchen");
    assertThat(permissionService.isAllowed(guest, ProtectedAction.LIGHTS, livingRoom), is(false));
    assertThat(permissionService.isAllowed(guest, ProtectedAction.WINDOWS, livingRoom), is(false));
    guest.setLocation("outside");
    assertThat(permissionService.isAllowed(guest, ProtectedAction.LIGHTS, livingRoom), is(false));
    assertThat(permissionService.isAllowed(guest, ProtectedAction.WINDOWS, livingRoom), is(false));
  }
}
