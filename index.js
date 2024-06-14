const togglePopUp = () => {
  const popUp = document.querySelector(".popup");
  if (popUp.style.display == "flex") {
    const error = document.querySelector(".error");
    popUp.style.display = "none";
    error.style.display = "none";
  } else {
    popUp.style.display = "flex";
  }
};

const getAllData = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  document.querySelector(".todo-list").innerHTML = tasks
    .map((task, index) => {
      return `
      <div class="todo-item" key=${index}>
                      <div class="todo-input ${
                        task.isDone && "done"
                      }" onclick="doneTask(${task.id})">
                          <input type="radio" ${
                            task.isDone ? "checked" : null
                          } id="task${index}">
                          <label for="task${index}">${task.title}</label>
                      </div>
                      <button class="todo-img" onclick="deleteTask(${task.id})">
                          <img src="images/trash.svg" alt="">
                      </button>
                  </div>
      `;
    })
    .join("");
};

window.addEventListener("load", () => getAllData());

document.querySelector(".form-popup").addEventListener("submit", (e) => {
  e.preventDefault();
  let input_value = document.querySelector(".input-value");
  const error = document.querySelector(".error");
  if (input_value.value.length > 0) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({
      id: tasks.length + 1,
      title: input_value.value,
      isDone: false,
    });
    input_value.value = "";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    getAllData();
    togglePopUp();
  } else {
    error.style.display = "flex";
  }
});

const deleteTask = (id) => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const filteredTasks = tasks.filter((t) => t.id !== id);
  console.log(filteredTasks);
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  getAllData();
};

const doneTask = (id) => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const doneTask = tasks.map((t, i) => {
    if (t.id == id) {
      t.isDone = !t.isDone;
    }
    return t;
  });
  localStorage.setItem("tasks", JSON.stringify(doneTask));
  getAllData();
};
