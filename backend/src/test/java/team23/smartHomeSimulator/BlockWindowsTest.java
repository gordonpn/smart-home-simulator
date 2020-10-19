package team23.smartHomeSimulator;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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

@SpringBootTest
@AutoConfigureMockMvc
public class BlockWindowsTest {

  @Autowired private MockMvc mockMvc;

  @BeforeEach
  public void shouldReturnHouseLayout() throws Exception {
    MockHttpServletRequestBuilder builder =
        MockMvcRequestBuilders.post("/api/upload-house")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content(
                "{\"rooms\":{\"bedroom1\":{\"roomNumber\":\"41\",\"numDoors\":1,\"numWindows\":1,\"numLights\":1},\"bedroom2\":{\"roomNumber\":\"2\",\"numDoors\":1,\"numWindows\":2,\"numLights\":1},\"bedroom3\":{\"roomNumber\":\"2\",\"numDoors\":1,\"numWindows\":2,\"numLights\":1},\"bedroom4\":{\"roomNumber\":\"2\",\"numDoors\":1,\"numWindows\":2,\"numLights\":1},\"kitchen\":{\"roomNumber\":\"2\",\"numDoors\":1,\"numWindows\":2,\"numLights\":1},\"living room\":{\"roomNumber\":\"2\",\"numDoors\":1,\"numWindows\":2,\"numLights\":1},\"dining\":{\"roomNumber\":\"2\",\"numDoors\":1,\"numWindows\":2,\"numLights\":1},\"bathroom1\":{\"roomNumber\":\"2\",\"numDoors\":1,\"numWindows\":2,\"numLights\":1},\"deck\":{\"roomNumber\":\"2\",\"numDoors\":1,\"numWindows\":2,\"numLights\":1},\"entrance\":{\"roomNumber\":\"2\",\"numDoors\":1,\"numWindows\":2,\"numLights\":1},\"garage\":{\"roomNumber\":\"2\",\"numDoors\":1,\"numWindows\":2,\"numLights\":1}}}");

    this.mockMvc.perform(builder).andDo(print()).andExpect(status().isOk());
  }

  @Test
  public void shouldReturnRooms() throws Exception {
    this.mockMvc
        .perform(get("/api/rooms"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString("{\"bedroom3\":{")));
  }

  @Test
  public void shouldReturnWindows() throws Exception {
    MockHttpServletRequestBuilder builder =
        MockMvcRequestBuilders.get("/api/rooms/windows").param("roomName", "bedroom3");

    this.mockMvc
        .perform(builder)
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(
            content()
                .string(
                    containsString(
                        "{\"window-1\":{\"isOpen\":false,\"isBlocked\":false},\"window-2\":{\"isOpen\":false,\"isBlocked\":false}}")));
  }
}
