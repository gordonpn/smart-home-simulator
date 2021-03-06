package team23.smartHomeSimulator;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
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
public class LockDoorsTest {

  @Autowired private MockMvc mockMvc;

  @BeforeEach
  public void shouldReturnHouseLayout() throws Exception {

    String content =
        "{\"rooms\":{\"bedroom3\":{\"roomNumber\":\"2\",\"numDoors\":1,\"numWindows\":2,\"numLights\":1},"
            + "\"bathroom\":{\"roomNumber\":\"1\",\"numDoors\":1,\"numWindows\":2,\"numLights\":1},"
            + "\"living room\":{\"roomNumber\":\"3\",\"numDoors\":1,\"numWindows\":2,\"numLights\":1},"
            + "\"entrance\":{\"roomNumber\":\"4\",\"numDoors\":1,\"numWindows\":2,\"numLights\":1},"
            + "\"kitchen\":{\"roomNumber\":\"5\",\"numDoors\":1,\"numWindows\":2,\"numLights\":1},"
            + "\"deck\":{\"roomNumber\":\"6\",\"numDoors\":1,\"numWindows\":2,\"numLights\":1}}}";

    MockHttpServletRequestBuilder builder =
        MockMvcRequestBuilders.post("/api/upload-house")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content(content);

    this.mockMvc.perform(builder).andDo(print()).andExpect(status().isOk());

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
  public void shouldLockAndUnlockDoors() throws Exception {
    MockHttpServletRequestBuilder builderLock =
        MockMvcRequestBuilders.put("/api/rooms/doors/lock-door")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content("{\"doorName\":\"kitchen-d1\",\"roomName\":\"kitchen\",\"state\":\"true\"}");

    this.mockMvc
        .perform(builderLock)
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.kitchen-d1.lockable").value(true))
        .andExpect(jsonPath("$.kitchen-d1.locked").value(true))
        .andExpect(jsonPath("$.kitchen-d1.open").value(false));

    MockHttpServletRequestBuilder builderUnlock =
        MockMvcRequestBuilders.put("/api/rooms/doors/lock-door")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content("{\"doorName\":\"kitchen-d1\",\"roomName\":\"kitchen\",\"state\":\"false\"}");

    this.mockMvc
        .perform(builderUnlock)
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.kitchen-d1.lockable").value(true))
        .andExpect(jsonPath("$.kitchen-d1.locked").value(false))
        .andExpect(jsonPath("$.kitchen-d1.open").value(false));
  }
}
