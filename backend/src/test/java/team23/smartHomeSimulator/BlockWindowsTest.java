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

    String content =
        "{\"rooms\":{\"bedroom3\":{\"roomNumber\":\"2\",\"numDoors\":1,\"numWindows\":2,\"numLights\":1}}}";

    MockHttpServletRequestBuilder builder =
        MockMvcRequestBuilders.post("/api/upload-house")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content(content);

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

    String results =
        "{\"window-1\":{\"isOpen\":false,\"isBlocked\":false},\"window-2\":{\"isOpen\":false,\"isBlocked\":false}}";

    this.mockMvc
        .perform(builder)
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString(results)));
  }

  @Test
  public void shouldBlockAndUnblockWindow() throws Exception {
    MockHttpServletRequestBuilder builderBlock =
        MockMvcRequestBuilders.put("/api/rooms/windows/block-window")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content("{\"windowName\":\"window-1\",\"roomName\":\"bedroom3\"}");

    String resultsBlock =
        "{\"window-1\":{\"isOpen\":false,\"isBlocked\":true},\"window-2\":{\"isOpen\":false,\"isBlocked\":false}}";

    this.mockMvc
        .perform(builderBlock)
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString(resultsBlock)));

    MockHttpServletRequestBuilder builderUnblock =
        MockMvcRequestBuilders.delete("/api/rooms/windows/block-window")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content("{\"windowName\":\"window-1\",\"roomName\":\"bedroom3\"}");

    String resultsUnblock =
        "{\"window-1\":{\"isOpen\":false,\"isBlocked\":false},\"window-2\":{\"isOpen\":false,\"isBlocked\":false}}";

    this.mockMvc
        .perform(builderUnblock)
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString(resultsUnblock)));
  }
}
