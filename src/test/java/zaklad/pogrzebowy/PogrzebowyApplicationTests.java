package zaklad.pogrzebowy;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import zaklad.pogrzebowy.api.PogrzebowyApplication;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@ContextConfiguration(classes = PogrzebowyApplication.class)


class PogrzebowyApplicationTests {

	@Test
	void contextLoads() {
	}

	void simpleTest() {
		assertTrue(true, "???");
	}

}
