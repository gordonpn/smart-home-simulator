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
        "{\"rooms\":{\"deck\":{\"roomNumber\":\"2\",\"numDoors\":1,\"numWindows\":1,\"numLights\":1}}}";

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
            .content("{\"doorName\":\"door-1\",\"roomName\":\"deck\",\"state\":\"true\"}");

    this.mockMvc
        .perform(builderLock)
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.door-1.lockable").value(true))
        .andExpect(jsonPath("$.door-1.locked").value(true))
        .andExpect(jsonPath("$.door-1.open").value(false));

    MockHttpServletRequestBuilder builderUnlock =
        MockMvcRequestBuilders.put("/api/rooms/doors/lock-door")
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .characterEncoding("UTF-8")
            .content("{\"doorName\":\"door-1\",\"roomName\":\"deck\",\"state\":\"false\"}");

    this.mockMvc
        .perform(builderUnlock)
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.door-1.lockable").value(true))
        .andExpect(jsonPath("$.door-1.locked").value(false))
        .andExpect(jsonPath("$.door-1.open").value(false));
  }
}
