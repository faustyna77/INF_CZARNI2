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
  const [filterOrderId, setFilterOrderId] = useState("");
  const [employees, setEmployees] = useState([]);
const [taskEmployeeId, setTaskEmployeeId] = useState(null);

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
  fetchEmployees();  // Dodane
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
          order: taskOrderId ? { id: taskOrderId } : null
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
          order: taskOrderId ? { id: taskOrderId } : null
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

  const filteredTasks = filterOrderId
    ? tasks.filter((task) => task.order?.id === Number(filterOrderId))
    : tasks;

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-gray-100">
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
            onChange={(e) => setTaskOrderId(Number(e.target.value))}
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
          <label className="block text-gray-400 mb-1 text-sm">Filtruj po zamówieniu</label>
          <select
            className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-200"
            value={filterOrderId}
            onChange={(e) => setFilterOrderId(e.target.value)}
          >
            <option value="">Wszystkie</option>
            {orders.map((order) => (
              <option key={order.id} value={order.id}>
                {order.id} - {`${order.cadaverFirstName} ${order.cadaverLastName}` || "Zamówienie"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end mb-6">
        {editingTaskId ? (
          <button
            onClick={() => handleEditTask(editingTaskId)}
            className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Zapisz zmiany
          </button>
        ) : (
          <button
            onClick={handleAddTask}
            className="bg-green-700 hover:bg-green-600 text-white px-6 py-2 rounded"
          >
            Dodaj zadanie
          </button>
        )}
      </div>
      <div>
  <label className="block text-gray-400 mb-1 text-sm">Pracownik</label>
  <select
    className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-200"
    value={taskEmployeeId || ""}
    onChange={(e) => setTaskEmployeeId(Number(e.target.value))}
  >
    <option value="">Brak</option>
    {employees.map((employee) => (
      <option key={employee.id} value={employee.id}>
        {employee.firstName} {employee.lastName}
      </option>
    ))}
  </select>
</div>


      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div className="bg-gray-800 rounded-lg shadow overflow-hidden" key={task.id}>
            <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <p className="text-lg font-semibold">{task.taskName}</p>
                <p className="text-sm text-gray-400">{task.status} | {task.priority}</p>
                <p className="text-sm text-gray-400">{task.description}</p>
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
        ))}
      </div>
    </div>
  );
};

export default TaskPlans;
