import { useEffect, useState } from "react";

const TaskPlans = () => {
  const [tasks, setTasks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskPriority, setTaskPriority] = useState("medium");
  const [taskStatus, setTaskStatus] = useState("pending");
  const [taskOrderId, setTaskOrderId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [taskEmployeeId, setTaskEmployeeId] = useState(null);

  // Stan dla zaawansowanego filtrowania
  const [filterOrderId, setFilterOrderId] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterEmployee, setFilterEmployee] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [filterName, setFilterName] = useState("");

  // Stan dla generowania raportu
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState("details");

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/users", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Failed to fetch employees");
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchOrders();
    fetchEmployees();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/tasks", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/orders", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const resetForm = () => {
    setTaskName("");
    setTaskDescription("");
    setTaskDeadline("");
    setTaskPriority("medium");
    setTaskStatus("pending");
    setTaskOrderId(null);
    setTaskEmployeeId(null);
  };

  const handleAddTask = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          taskName,
          description: taskDescription,
          priority: taskPriority,
          status: taskStatus,
          dueDate: taskDeadline,
          order: taskOrderId ? { id: taskOrderId } : null,
          assignedUser: taskEmployeeId ? { id: taskEmployeeId } : null
        }),
      });

      if (!res.ok) throw new Error("Błąd przy dodawaniu zadania");

      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);
      resetForm();
    } catch (err) {
      console.error("Błąd przy dodawaniu zadania:", err);
    }
  };

  const handleEditTask = async (taskId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          taskName,
          description: taskDescription,
          priority: taskPriority,
          status: taskStatus,
          dueDate: taskDeadline,
          order: taskOrderId ? { id: taskOrderId } : null,
          assignedUser: taskEmployeeId ? { id: taskEmployeeId } : null
        }),
      });

      if (!res.ok) throw new Error("Błąd przy edycji zadania");

      const updatedTask = await res.json();
      setTasks((prev) =>
          prev.map((task) => (task.id === taskId ? updatedTask : task))
      );
      setEditingTaskId(null);
      resetForm();
    } catch (err) {
      console.error("Błąd przy edycji:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Błąd przy usuwaniu zadania");

      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Błąd usuwania zadania:", err);
    }
  };

  const resetFilters = () => {
    setFilterOrderId("");
    setFilterStatus("");
    setFilterPriority("");
    setFilterEmployee("");
    setFilterDateFrom("");
    setFilterDateTo("");
    setFilterName("");
  };

  // Funkcja do generowania i otwierania raportu HTML w nowym oknie
// Funkcja do generowania i otwierania raportu HTML w nowym oknie
  const generateReport = async () => {
    const token = localStorage.getItem("token");

    try {
      // Otwórz nowe okno przed wykonaniem żądania
      const reportWindow = window.open('', '_blank');
      reportWindow.document.write('<html><body><h2>Generowanie raportu, proszę czekać...</h2></body></html>');

      const response = await fetch("http://localhost:8080/reports/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          filters: {
            orderId: filterOrderId ? Number(filterOrderId) : null,
            status: filterStatus || null,
            priority: filterPriority || null,
            employeeId: filterEmployee ? Number(filterEmployee) : null,
            dateFrom: filterDateFrom || null,
            dateTo: filterDateTo || null,
            name: filterName || null
          },
          reportType
        }),
      });

      console.log("Status odpowiedzi:", response.status);

      if (!response.ok) {
        throw new Error(`Błąd: ${response.status} ${response.statusText}`);
      }

      // Pobierz zawartość HTML i wstaw ją do nowego okna
      const htmlContent = await response.text();
      console.log("Otrzymana odpowiedź:", htmlContent.substring(0, 100) + "..."); // Pokaż początek odpowiedzi

      reportWindow.document.open();
      reportWindow.document.write(htmlContent);
      reportWindow.document.close();

      setShowReportModal(false);
    } catch (err) {
      console.error("Błąd przy generowaniu raportu:", err);
      alert(`Wystąpił błąd podczas generowania raportu: ${err.message}`);
    }
  };
  // Zastosuj wszystkie filtry do zadań
  const filteredTasks = tasks.filter((task) => {
    // Filtruj po zamówieniu
    if (filterOrderId && task.order?.id !== Number(filterOrderId)) return false;

    // Filtruj po statusie
    if (filterStatus && task.status !== filterStatus) return false;

    // Filtruj po priorytecie
    if (filterPriority && task.priority !== filterPriority) return false;

    // Filtruj po pracowniku
    if (filterEmployee && (!task.assignedUser || task.assignedUser.id !== Number(filterEmployee))) return false;

    // Filtruj po nazwie
    if (filterName && !task.taskName.toLowerCase().includes(filterName.toLowerCase())) return false;

    // Filtruj po zakresie dat
    if (filterDateFrom && task.dueDate && new Date(task.dueDate) < new Date(filterDateFrom)) return false;
    if (filterDateTo && task.dueDate && new Date(task.dueDate) > new Date(filterDateTo)) return false;

    return true;
  });

  return (
      <div className="container mx-auto p-4 bg-gray-900 text-gray-100">
        {/* Formularz zadania */}
        <div className="mb-8 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            {editingTaskId ? "Edytuj zadanie" : "Dodaj nowe zadanie"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-400 mb-1 text-sm">Nazwa zadania</label>
              <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-200"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1 text-sm">Opis zadania</label>
              <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-200"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1 text-sm">Termin wykonania</label>
              <input
                  type="datetime-local"
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-200"
                  value={taskDeadline}
                  onChange={(e) => setTaskDeadline(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1 text-sm">Priorytet</label>
              <select
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-200"
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value)}
              >
                <option value="low">Niski</option>
                <option value="medium">Średni</option>
                <option value="high">Wysoki</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-1 text-sm">Status</label>
              <select
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-200"
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
              >
                <option value="pending">Oczekujące</option>
                <option value="in_progress">W trakcie</option>
                <option value="completed">Zakończone</option>
                <option value="canceled">Anulowane</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-1 text-sm">Zamówienie</label>
              <select
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-200"
                  value={taskOrderId || ""}
                  onChange={(e) => setTaskOrderId(Number(e.target.value) || null)}
              >
                <option value="">Brak</option>
                {orders.map((order) => (
                    <option key={order.id} value={order.id}>
                      {order.id} - {(order.cadaverFirstName && order.cadaverLastName) ? `${order.cadaverFirstName} ${order.cadaverLastName}` : "Zamówienie"}
                    </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-1 text-sm">Pracownik</label>
              <select
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-200"
                  value={taskEmployeeId || ""}
                  onChange={(e) => setTaskEmployeeId(Number(e.target.value) || null)}
              >
                <option value="">Brak</option>
                {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName}
                    </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            {editingTaskId ? (
                <div className="flex gap-2">
                  <button
                      onClick={() => {
                        setEditingTaskId(null);
                        resetForm();
                      }}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded"
                  >
                    Anuluj
                  </button>
                  <button
                      onClick={() => handleEditTask(editingTaskId)}
                      className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-2 rounded"
                  >
                    Zapisz zmiany
                  </button>
                </div>
            ) : (
                <button
                    onClick={handleAddTask}
                    className="bg-green-700 hover:bg-green-600 text-white px-6 py-2 rounded"
                >
                  Dodaj zadanie
                </button>
            )}
          </div>
        </div>

        {/* Sekcja zaawansowanego filtrowania */}
        <div className="mb-8 bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filtrowanie zaawansowane</h2>
            <div className="flex gap-2">
              <button
                  onClick={resetFilters}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm"
              >
                Resetuj filtry
              </button>
              <button
                  onClick={() => setShowReportModal(true)}
                  className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
              >
                Generuj raport
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-400 mb-1 text-sm">Nazwa zadania</label>
              <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-200"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  placeholder="Filtruj po nazwie..."
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1 text-sm">Zamówienie</label>
              <select
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-200"
                  value={filterOrderId}
                  onChange={(e) => setFilterOrderId(e.target.value)}
              >
                <option value="">Wszystkie</option>
                {orders.map((order) => (
                    <option key={order.id} value={order.id}>
                      {order.id} - {(order.cadaverFirstName && order.cadaverLastName) ? `${order.cadaverFirstName} ${order.cadaverLastName}` : "Zamówienie"}
                    </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-1 text-sm">Status</label>
              <select
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-200"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">Wszystkie</option>
                <option value="pending">Oczekujące</option>
                <option value="in_progress">W trakcie</option>
                <option value="completed">Zakończone</option>
                <option value="canceled">Anulowane</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-1 text-sm">Priorytet</label>
              <select
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-200"
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
              >
                <option value="">Wszystkie</option>
                <option value="low">Niski</option>
                <option value="medium">Średni</option>
                <option value="high">Wysoki</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-1 text-sm">Pracownik</label>
              <select
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-200"
                  value={filterEmployee}
                  onChange={(e) => setFilterEmployee(e.target.value)}
              >
                <option value="">Wszyscy</option>
                {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName}
                    </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-gray-400 mb-1 text-sm">Data od</label>
                <input
                    type="date"
                    className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-200"
                    value={filterDateFrom}
                    onChange={(e) => setFilterDateFrom(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-400 mb-1 text-sm">Data do</label>
                <input
                    type="date"
                    className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-200"
                    value={filterDateTo}
                    onChange={(e) => setFilterDateTo(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lista zadań */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Lista zadań ({filteredTasks.length})
          </h2>

          {filteredTasks.length === 0 ? (
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <p>Brak zadań spełniających kryteria filtrowania</p>
              </div>
          ) : (
              filteredTasks.map((task) => (
                  <div className="bg-gray-800 rounded-lg shadow overflow-hidden" key={task.id}>
                    <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <p className="text-lg font-semibold">{task.taskName}</p>
                        <p className="text-sm text-gray-400">
                          {task.status === "pending" && "Oczekujące"}
                          {task.status === "in_progress" && "W trakcie"}
                          {task.status === "completed" && "Zakończone"}
                          {task.status === "canceled" && "Anulowane"}
                          {" | "}
                          {task.priority === "low" && "Niski priorytet"}
                          {task.priority === "medium" && "Średni priorytet"}
                          {task.priority === "high" && "Wysoki priorytet"}
                        </p>
                        <p className="text-sm text-gray-400">{task.description}</p>
                        <p className="text-sm text-gray-500">
                          Termin: {task.dueDate ? new Date(task.dueDate).toLocaleString('pl-PL') : "nie określono"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Zamówienie: {(task.order?.cadaverFirstName && task.order?.cadaverLastName) ? `${task.order.cadaverFirstName} ${task.order.cadaverLastName}` : (task.order?.id ? `ID: ${task.order.id}` : "brak")}
                        </p>
                        <p className="text-sm text-gray-500">
                          Przypisany: {task.assignedUser ? `${task.assignedUser.firstName} ${task.assignedUser.lastName}` : "brak"}
                        </p>
                      </div>

                      <div className="flex gap-2 mt-2 md:mt-0">
                        <button
                            className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
                            onClick={() => {
                              setTaskName(task.taskName);
                              setTaskDescription(task.description || "");
                              setTaskDeadline(task.dueDate || "");
                              setTaskPriority(task.priority);
                              setTaskStatus(task.status);
                              setTaskOrderId(task.order?.id || null);
                              setTaskEmployeeId(task.assignedUser?.id || null);
                              setEditingTaskId(task.id);
                            }}
                        >
                          Edytuj
                        </button>
                        <button
                            className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
                            onClick={() => handleDeleteTask(task.id)}
                        >
                          Usuń
                        </button>
                      </div>
                    </div>
                  </div>
              ))
          )}
        </div>

        {/* Modal generowania raportu */}
        {showReportModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Generuj raport</h2>

                <div className="mb-6">
                  <label className="block text-gray-400 mb-1">Typ raportu</label>
                  <select
                      className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-200"
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                  >
                    <option value="details">Szczegółowy</option>
                    <option value="summary">Podsumowanie</option>
                    <option value="stats">Statystyki</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                      onClick={() => setShowReportModal(false)}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
                  >
                    Anuluj
                  </button>
                  <button
                      onClick={generateReport}
                      className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Generuj
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default TaskPlans;