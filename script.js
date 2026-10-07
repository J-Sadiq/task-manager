const taskForm = document.getElementById("add-task-form");
const taskInput = document.getElementById("task");
const tasks = document.getElementById("tasks");

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const listItem = document.createElement("li");

  const deleteButton = document.createElement("button");

  deleteButton.textContent = "Delete";

  listItem.textContent = taskInput.value;

  listItem.appendChild(deleteButton);

  tasks.appendChild(listItem);

  taskInput.value = "";

  deleteButton.addEventListener("click", function () {
    listItem.remove();
  });

  listItem.addEventListener("click", function () {
    listItem.classList.toggle("completed");
  });
});
