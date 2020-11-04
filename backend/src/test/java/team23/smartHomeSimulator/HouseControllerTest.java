package team23.smartHomeSimulator;

import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
        MockMvcRequestBuilders.post("/api/upload-house")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content(
                "{\"rooms\":{\"room1\":{\"roomNumber\":\"41\",\"numDoors\":4,\"numWindows\":1,\"numLights\":10},\"room2\":{\"roomNumber\":\"2\",\"numDoors\":4,\"numWindows\":1,\"numLights\":10}}}");

    this.mockMvc
        .perform(builder)
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString("room1")))
        .andExpect(content().string(containsString("room2")));
  }

  @Test
  public void shouldReturnValueSent() throws Exception {
    MockHttpServletRequestBuilder builder =
        MockMvcRequestBuilders.put("/api/outside-temperature")
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
}
