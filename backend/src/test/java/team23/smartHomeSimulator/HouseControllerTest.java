package team23.smartHomeSimulator;

import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import team23.smartHomeSimulator.model.Room;

@SpringBootTest
@AutoConfigureMockMvc
public class HouseControllerTest {

  @Autowired private MockMvc mockMvc;

  @BeforeEach
  public void shouldReturnHouseLayout() throws Exception {
    MockHttpServletRequestBuilder builder =
        post("/api/upload-house")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content(
                "{\"rooms\":{\"room1\":{\"roomNumber\":\"41\",\"numDoors\":1,\"numWindows\":1,\"numLights\":1},\"room2\":{\"roomNumber\":\"2\",\"numDoors\":4,\"numWindows\":1,\"numLights\":10}}}");

    this.mockMvc
        .perform(builder)
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString("room1")))
        .andExpect(content().string(containsString("room2")));

    MockHttpServletRequestBuilder createProfileBuilder =
        post("/api/profiles")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content(
                "{\"name\":\"Gordon\",\"location\":\"location\",\"role\":\"role\",\"permission\":\"Parent\"}");

    this.mockMvc.perform(createProfileBuilder).andDo(print()).andExpect(status().isOk());

    this.mockMvc
        .perform(put("/api/profiles/login").param("name", "Gordon"))
        .andExpect(status().isOk());
  }

  @Test
  public void shouldReturnValueSent() throws Exception {
    MockHttpServletRequestBuilder builder =
        put("/api/outside-temperature")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content("{\"outTemp\": 20}");

    this.mockMvc
        .perform(builder)
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString("{\"outTemp\":20.0")));
  }

  @Test
  public void shouldBeLockableOrNot() throws Exception {
    Room lockableRoom = new Room("room1", "deck", 1, 1, 1);
    Room nonLockableRoom = new Room("room2", "bathroom", 1, 1, 1);

    assertTrue(lockableRoom.getDoors().get("door-1").isLockable());
    assertFalse(nonLockableRoom.getDoors().get("door-1").isLockable());
  }

  @Test
  public void shouldAddUser() throws Exception {
    MockHttpServletRequestBuilder builder =
        MockMvcRequestBuilders.put("/api/house-users")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content("{\"name\": \"user1\",\"location\":\"kitchen\"}");
    this.mockMvc
        .perform(builder)
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.location").value("kitchen"));
  }

  @Test
  public void shouldChangeUserLocation() throws Exception {
    MockHttpServletRequestBuilder builder =
        MockMvcRequestBuilders.put("/api/house-users")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content("{\"name\": \"user1\",\"location\":\"kitchen\"}");
    this.mockMvc.perform(builder);
    MockHttpServletRequestBuilder builderUpdate =
        MockMvcRequestBuilders.put("/api/house-users")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content("{\"name\": \"user1\",\"location\":\"garage\"}");
    this.mockMvc
        .perform(builderUpdate)
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.location").value("garage"));
  }

  @Test
  public void shouldRemoveUser() throws Exception {
    MockHttpServletRequestBuilder builder =
        MockMvcRequestBuilders.put("/api/house-users")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content("{\"name\": \"user1\",\"location\":\"kitchen\"}");
    this.mockMvc
        .perform(builder)
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.location").value("kitchen"));

    this.mockMvc
        .perform(delete("/api/house-users").param("name", "user1"))
        .andExpect(status().isOk())
        .andExpect(content().string(containsString("Removed user1 successfully")));
  }

  public void shouldOpenAndCloseWindow() throws Exception {
    MockHttpServletRequestBuilder builderBlock =
        put("/api/rooms/windows/open-window")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content("{\"windowName\":\"window-1\",\"roomName\":\"room1\",\"state\":\"true\"}");

    String resultsBlock = "{\"window-1\":{\"isOpen\":true,\"blocked\":false}}";

    this.mockMvc
        .perform(builderBlock)
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString(resultsBlock)));

    MockHttpServletRequestBuilder builderUnblock =
        put("/api/rooms/windows/open-window")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content("{\"windowName\":\"window-1\",\"roomName\":\"room1\",\"state\":\"false\"}");

    String resultsUnblock = "{\"window-1\":{\"isOpen\":false,\"blocked\":false}}";

    this.mockMvc
        .perform(builderUnblock)
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString(resultsUnblock)));
  }

  @Test
  public void shouldOpenAndCloseDoor() throws Exception {
    MockHttpServletRequestBuilder builderLock =
        put("/api/rooms/doors/open-door")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content("{\"doorName\":\"door-1\",\"roomName\":\"room1\",\"state\":\"true\"}");

    String resultsLock = "{\"door-1\":{\"lockable\":false,\"locked\":false,\"open\":true}}";

    this.mockMvc
        .perform(builderLock)
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString(resultsLock)));

    MockHttpServletRequestBuilder builderUnlock =
        put("/api/rooms/doors/open-door")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content("{\"doorName\":\"door-1\",\"roomName\":\"room1\",\"state\":\"false\"}");

    this.mockMvc
        .perform(builderUnlock)
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString("\"lockable\":false")))
        .andExpect(content().string(containsString("\"locked\":false")))
        .andExpect(content().string(containsString("\"open\":false")));
  }

  @Test
  public void shouldOpenAndCloseLights() throws Exception {
    MockHttpServletRequestBuilder builderBlock =
        put("/api/rooms/lights/open-light")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content("{\"lightName\":\"light-1\",\"roomName\":\"room1\",\"state\":\"true\"}");

    String resultsBlock = "{\"light-1\":{\"isOn\":true}";

    this.mockMvc
        .perform(builderBlock)
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString(resultsBlock)));

    MockHttpServletRequestBuilder builderUnblock =
        put("/api/rooms/lights/open-light")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content("{\"lightName\":\"light-1\",\"roomName\":\"room1\",\"state\":\"false\"}");

    String resultsUnblock = "{\"light-1\":{\"isOn\":false}";

    this.mockMvc
        .perform(builderUnblock)
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString(resultsUnblock)));
  }
}
