
INSERT INTO users (email, first_name, last_name, password_hash, role) VALUES
('faustyna@funeral.com', 'Faustyna', 'Misiura', '$2a$10$jttsqhGsLAPv8LG9yimR.OkouYjewLkBLGpt5MOah6m/31qKl5/QO', 'ADMIN'),
('michal@funeral.com', 'Michal', 'Dyjak', '$2a$10$jttsqhGsLAPv8LG9yimR.OkouYjewLkBLGpt5MOah6m/31qKl5/QO', 'ADMIN'),
('mateusz1@funeral.com', 'Mateusz', 'Holyszko', '$2a$10$jttsqhGsLAPv8LG9yimR.OkouYjewLkBLGpt5MOah6m/31qKl5/QO', 'ADMIN'),
('mateusz2@funeral.com', 'Mateusz', 'Florian', '$2a$10$jttsqhGsLAPv8LG9yimR.OkouYjewLkBLGpt5MOah6m/31qKl5/QO', 'ADMIN'),
('user@funeral.com', 'Tomasz', 'Kowalski', '$2a$10$op.mSq8q9wbJDHvTgbvKQuKes7YHGdRR8OLo45KqV.kHqQms7tUtq', 'USER');

INSERT INTO clients (first_name, last_name, phone) VALUES
('Katarzyna', 'Zielińska', '123456789'),
('Jan', 'Wiśniewski', '987654321');

INSERT INTO orders (cadaver_first_name, cadaver_last_name, order_date, status, user_id) VALUES
('Zofia', 'Lis', '2025-04-08 09:00:00', 'new', 1),
('Stanisław', 'Mazur', '2025-04-07 15:30:00', 'processing', 2);

INSERT INTO tasks (task_name, description, created_at, updated_at, due_date, status, priority, order_id) VALUES
('Transport ciała', 'Przewiezienie ciała z miejsca zgonu do chłodni', '2025-04-08 09:15:00', '2025-04-08 09:30:00', '2025-04-08 12:00:00', 'open', 'high', 1),
('Przygotowanie dokumentów', 'Wypełnienie aktów zgonu', '2025-04-07 16:00:00', '2025-04-07 16:30:00', '2025-04-08 10:00:00', 'in_progress', 'medium', 2);
