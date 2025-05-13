package zaklad.pogrzebowy.api.services;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import zaklad.pogrzebowy.api.models.Task;
import zaklad.pogrzebowy.api.models.User;
import zaklad.pogrzebowy.api.repositories.UserRepository;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class UserReportService {

    @Autowired
    private UserRepository userRepository;

    public ByteArrayInputStream generateReport(Object filters) {
        List<User> users = userRepository.findAll();

        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD);
            Font userFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
            Font taskFont = new Font(Font.FontFamily.HELVETICA, 11);

            document.add(new Paragraph("Raport użytkowników i zadań", titleFont));
            document.add(new Paragraph(" ")); // pusty wiersz

            for (User user : users) {
                document.add(new Paragraph("Użytkownik: " + user.getFirstName() + " " + user.getLastName(), userFont));
                document.add(new Paragraph("Email: " + user.getEmail(), taskFont));
                document.add(new Paragraph("Rola: " + user.getRole(), taskFont));

                if (user.getAssignedTasks().isEmpty()) {
                    document.add(new Paragraph("Brak przypisanych zadań.", taskFont));
                } else {
                    for (Task task : user.getAssignedTasks()) {
                        document.add(new Paragraph(
                                " - " + task.getTaskName() + " | Status: " + task.getStatus() + " | Termin: " +
                                        (task.getDueDate() != null ? task.getDueDate().toString() : "brak"), taskFont
                        ));
                    }
                }

                document.add(new Paragraph(" ")); // odstęp między użytkownikami
            }

            document.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}
