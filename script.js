const API_URL = "https://todo-backend-9tqj.onrender.com/tasks"; // Change after deployment

async function loadTasks() {
  const res = await fetch(`${API_URL}/tasks`);
  const tasks = await res.json();
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.onclick = () => deleteTask(task._id);
    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value) return;
  await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input.value }),
  });
  input.value = "";
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
  loadTasks();
}

loadTasks();
