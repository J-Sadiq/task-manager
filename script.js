const taskForm = document.getElementById("add-task-form");
const taskInput = document.getElementById("task");
const tasks = document.getElementById("tasks");
const remainingCount = document.getElementById("remaining-count");
const btnAll = document.getElementById("all-tasks");
const btnCompleted = document.getElementById("completed-tasks");
const btnActive = document.getElementById("active-tasks");
const btnClearCompleted = document.getElementById("clear-completed");

let currentFilter = "all";
let taskMessage;
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let myTask = {
    id: Date.now(),
    text: taskInput.value,
    completed: false,
  };
  taskList.push(myTask);
  saveTasks();
  renderTasks();
  taskInput.value = "";
});

btnAll.addEventListener("click", function () {
  currentFilter = "all";
  renderTasks();
});

btnCompleted.addEventListener("click", function () {
  currentFilter = "completed";
  renderTasks();
});

btnActive.addEventListener("click", function () {
  currentFilter = "active";
  renderTasks();
});

btnClearCompleted.addEventListener("click", function () {
  taskList = taskList.filter((t) => !t.completed);
  saveTasks();
  renderTasks();
});

function getFilteredTasks() {
  let filteredTasks = taskList;
  if (currentFilter === "completed") {
    filteredTasks = taskList.filter((t) => t.completed);
  } else if (currentFilter === "active") {
    filteredTasks = taskList.filter((t) => !t.completed);
  }
  return filteredTasks;
}

function renderTasks() {
  tasks.innerHTML = "";
  const filteredTasks = getFilteredTasks();
  if (filteredTasks.length === 0) {
    if (currentFilter === "completed") {
      taskMessage = "No completed tasks";
    } else if (currentFilter === "active") {
      taskMessage = "No active tasks";
    } else {
      taskMessage = "No tasks";
    }
    tasks.innerHTML = `<li>${taskMessage}</li>`;
    return;
  }
  filteredTasks.forEach((task) => {
    const listItem = document.createElement("li");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.dataset.id = task.id;
    deleteButton.dataset.action = "delete";
    editButton.dataset.action = "edit";
    editButton.dataset.id = task.id;
    editButton.textContent = "Edit";
    listItem.dataset.id = task.id;

    if (task.completed) {
      listItem.classList.add("completed");
    }
    listItem.textContent = task.text;
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    tasks.appendChild(listItem);
  });
  const remainingTasks = taskList.filter((t) => !t.completed).length;
  remainingCount.textContent = remainingTasks;
}

tasks.addEventListener("click", function (event) {
  if (event.target.dataset.action === "delete") {
    taskList = taskList.filter(
      (t) => t.id !== parseInt(event.target.dataset.id),
    );
    saveTasks();
    renderTasks();
    return;
  }
  if (event.target.dataset.action === "edit") {
    const taskId = parseInt(event.target.dataset.id);
    const task = taskList.find((t) => t.id === taskId);
    if (task) {
      const newText = prompt("Edit task:", task.text);
      if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        saveTasks();
        renderTasks();
      }
      return;
    }
    re;
  }
  const listItem = event.target.closest("li");

  if (!listItem) return;

  const taskId = parseInt(listItem.dataset.id);
  const task = taskList.find((t) => t.id === taskId);

  if (task) {
    task.completed = !task.completed;
    listItem.classList.toggle("completed", task.completed);
    saveTasks();
    renderTasks();
  }
});

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}
