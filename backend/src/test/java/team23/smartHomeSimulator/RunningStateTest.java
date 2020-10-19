package team23.smartHomeSimulator;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class RunningStateTest {

  @Autowired private MockMvc mockMvc;

  @Test
  public void shouldReturnDefaultState() throws Exception {
    this.mockMvc
        .perform(get("/api/running"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString("false")));
  }

  @Test
  public void shouldSetRunningTrue() throws Exception {
    this.mockMvc
        .perform(put("/api/running"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString("true")));
  }

  @Test
  public void shouldSetRunningFalse() throws Exception {
    this.mockMvc.perform(put("/api/running")).andExpect(status().isOk());

    this.mockMvc
        .perform(delete("/api/running"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(containsString("false")));
  }
}
