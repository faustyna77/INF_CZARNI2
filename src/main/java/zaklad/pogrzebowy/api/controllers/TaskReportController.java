package zaklad.pogrzebowy.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zaklad.pogrzebowy.api.services.TaskReportService;

import java.io.ByteArrayInputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@RestController
@RequestMapping("/reports")
@CrossOrigin(origins = "*")
public class TaskReportController {

    @Autowired
    private TaskReportService reportService;

    @PostMapping(value = "/tasks", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<InputStreamResource> generateTaskReport(
            @RequestBody Map<String, Object> request,
            @RequestHeader("Authorization") String authHeader) {

        Map<String, Object> filters = (Map<String, Object>) request.get("filters");
        ByteArrayInputStream reportStream = reportService.generateReport(filters);

        // Generate filename with timestamp
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
        String filename = "raport_zadan_" + timestamp + ".pdf";

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=" + filename);
        headers.add("Access-Control-Expose-Headers", "Content-Disposition");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(reportStream));
    }

    @RequestMapping(value = "/tasks", method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handleOptions() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Allow-Origin", "*");
        headers.add("Access-Control-Allow-Methods", "POST, OPTIONS");
        headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization");
        headers.add("Access-Control-Expose-Headers", "Content-Disposition");

        return ResponseEntity.ok().headers(headers).build();
    }
}