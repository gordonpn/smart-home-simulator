package team23.smartHomeSimulator;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
public class HouseUploadTest {

  @Autowired private MockMvc mockMvc;

  @Test
  public void shouldReturnHouseLayout() throws Exception {
    MockHttpServletRequestBuilder builder =
        MockMvcRequestBuilders.post("/api/uploadHouse")
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
}
