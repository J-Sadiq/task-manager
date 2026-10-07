const taskForm = document.getElementById("add-task-form");
const taskInput = document.getElementById("task");
const tasks = document.getElementById("tasks");
const remainingCount = document.getElementById("remaining-count");

let taskList = [];
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let myTask = {
    id: Date.now(),
    text: taskInput.value,
    completed: false,
  };
  taskList.push(myTask);
  renderTasks();
  taskInput.value = "";
});

function renderTasks() {
  tasks.innerHTML = "";
  taskList.forEach((task) => {
    const listItem = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function (event) {
      event.stopPropagation();
      taskList = taskList.filter((t) => t.id !== task.id);
      renderTasks();
    });
    listItem.addEventListener("click", function () {
      task.completed = !task.completed;
      listItem.classList.toggle("completed", task.completed);
      console.log(taskList);
      renderTasks();
    });
    if (task.completed) {
      listItem.classList.add("completed");
    }
    listItem.textContent = task.text;
    listItem.appendChild(deleteButton);
    tasks.appendChild(listItem);
  });
  const remainingTasks = taskList.filter((t) => !t.completed).length;
  remainingCount.textContent = remainingTasks;
}
