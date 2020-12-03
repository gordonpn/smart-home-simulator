package team23.smartHomeSimulator;

import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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
import team23.smartHomeSimulator.model.Room;

@SpringBootTest
@AutoConfigureMockMvc
public class HouseControllerTest {

  @Autowired private MockMvc mockMvc;

  @BeforeEach
  public void shouldReturnHouseLayout() throws Exception {
    String content =
        "{\"rooms\":{\"bedroom3\":{\"roomNumber\":\"12\",\"numDoors\":1,\"numWindows\":2,\"numLights\":1},"
            + "\"bathroom\":{\"roomNumber\":\"1\",\"numDoors\":1,\"numWindows\":2,\"numLights\":1},"
            + "\"living room\":{\"roomNumber\":\"3\",\"numDoors\":1,\"numWindows\":2,\"numLights\":1},"
            + "\"entrance\":{\"roomNumber\":\"4\",\"numDoors\":1,\"numWindows\":2,\"numLights\":1},"
            + "\"kitchen\":{\"roomNumber\":\"5\",\"numDoors\":1,\"numWindows\":2,\"numLights\":1},"
            + "\"deck\":{\"roomNumber\":\"6\",\"numDoors\":1,\"numWindows\":2,\"numLights\":1},"
            + "\"room1\":{\"roomNumber\":\"41\",\"numDoors\":1,\"numWindows\":1,\"numLights\":1},"
            + "\"room2\":{\"roomNumber\":\"2\",\"numDoors\":4,\"numWindows\":1,\"numLights\":10}}}";
    MockHttpServletRequestBuilder builder =
        post("/api/upload-house")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content(content);

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
    // Kitchen door is the deck door
    Room lockableRoom = new Room("room1", "kitchen", 1, 1, 1);
    Room nonLockableRoom = new Room("room2", "bathroom", 1, 1, 1);

    assertTrue(lockableRoom.getDoors().get("kitchen-d1").isLockable());
    assertFalse(nonLockableRoom.getDoors().get("bathroom-d1").isLockable());
  }

  public void shouldOpenAndCloseWindow() throws Exception {
    MockHttpServletRequestBuilder builderBlock =
        put("/api/rooms/windows/open-window")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content("{\"windowName\":\"room1-w1\",\"roomName\":\"room1\",\"state\":\"true\"}");

    String resultsBlock = "{\"room1-w1\":{\"isOpen\":true,\"blocked\":false}}";

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
            .content("{\"windowName\":\"room1-w1\",\"roomName\":\"room1\",\"state\":\"false\"}");

    String resultsUnblock = "{\"room1-w1\":{\"isOpen\":false,\"blocked\":false}}";

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
            .content("{\"doorName\":\"room1-d1\",\"roomName\":\"room1\",\"state\":\"true\"}");

    String resultsLock = "{\"room1-d1\":{\"lockable\":false,\"locked\":false,\"open\":true}}";

    this.mockMvc
        .perform(builderLock)
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.room1-d1.open").value(true))
        .andExpect(jsonPath("$.room1-d1.locked").value(false))
        .andExpect(jsonPath("$.room1-d1.lockable").value(false));

    MockHttpServletRequestBuilder builderUnlock =
        put("/api/rooms/doors/open-door")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content("{\"doorName\":\"room1-d1\",\"roomName\":\"room1\",\"state\":\"false\"}");

    this.mockMvc
        .perform(builderUnlock)
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.room1-d1.open").value(false))
        .andExpect(jsonPath("$.room1-d1.locked").value(false))
        .andExpect(jsonPath("$.room1-d1.lockable").value(false));
  }

  @Test
  public void shouldOpenAndCloseLights() throws Exception {
    MockHttpServletRequestBuilder builderBlock =
        put("/api/rooms/lights/open-light")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content("{\"lightName\":\"room1-l1\",\"roomName\":\"room1\",\"state\":\"true\"}");

    String resultsBlock = "{\"room1-l1\":{\"isOn\":true}";

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
            .content("{\"lightName\":\"room1-l1\",\"roomName\":\"room1\",\"state\":\"false\"}");

    String resultsUnblock = "{\"room1-l1\":{\"isOn\":false}";

    this.mockMvc
        .perform(builderUnblock)
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString(resultsUnblock)));
  }
}
