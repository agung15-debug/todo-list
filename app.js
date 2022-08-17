let taskItems = [];

window.addEventListener("load", () => {
  const form = document.querySelector("#add-task");
  const input = document.querySelector("#new-task");
  const listAgenda = document.querySelector("#agenda");
  getTodos(); //ambil local storage ketika reload

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = input.value;

    if (task === "") {
      alert("Please enter a task");
      return;
    } else {
      if (taskItems.includes(task)) {
        alert("Task already exists");
        return;
      } else {
        saveLocal(task); //save local
        const taskEl = document.createElement("div");
        taskEl.classList.add("agenda-wrapper");

        const taskItem = document.createElement("div");
        taskItem.classList.add("task");

        taskEl.appendChild(taskItem);

        const inputEl = document.createElement("input");
        inputEl.classList.add("task-name");
        inputEl.type = "text";
        inputEl.value = task;
        inputEl.setAttribute("readonly", "readonly");

        taskItem.appendChild(inputEl);

        const action = document.createElement("div");
        action.classList.add("action");

        const editButton = document.createElement("button");
        editButton.classList.add("edit");
        editButton.innerText = "Edit";

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.innerText = "Delete";
        action.appendChild(editButton);
        action.appendChild(deleteButton);

        taskEl.appendChild(action);

        listAgenda.appendChild(taskEl);

        input.value = "";

        editButton.addEventListener("click", () => {
          if (editButton.innerText.toLowerCase() === "edit") {
            inputEl.removeAttribute("readonly");
            inputEl.focus();
            editButton.innerText = "Save";
          } else {
            inputEl.setAttribute("readonly", "readonly");
            editButton.innerText = "Edit";
          }
        });
        deleteButton.addEventListener("click", () => {
          listAgenda.removeChild(taskEl);
          taskItems.splice(taskItems.indexOf(task), 1);
        });
      }
    }
  });

  function saveLocal(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach((todo) => {
      taskItems.push(todo);
      const taskEl = document.createElement("div");
      taskEl.classList.add("agenda-wrapper");

      const taskItem = document.createElement("div");
      taskItem.classList.add("task");

      taskEl.appendChild(taskItem);

      const inputEl = document.createElement("input");
      inputEl.classList.add("task-name");
      inputEl.type = "text";
      inputEl.value = todo;
      inputEl.setAttribute("readonly", "readonly");

      taskItem.appendChild(inputEl);

      const action = document.createElement("div");
      action.classList.add("action");

      const editButton = document.createElement("button");
      editButton.classList.add("edit");
      editButton.innerText = "Edit";

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete");
      deleteButton.innerText = "Delete";
      action.appendChild(editButton);
      action.appendChild(deleteButton);

      taskEl.appendChild(action);

      listAgenda.appendChild(taskEl);

      editButton.addEventListener("click", () => {
        if (editButton.innerText.toLowerCase() === "edit") {
          inputEl.removeAttribute("readonly");
          inputEl.focus();
          editButton.innerText = "Save";
        } else {
          inputEl.setAttribute("readonly", "readonly");
          editButton.innerText = "Edit";
        }
        editTodo(todo, inputEl.value);
      });

      deleteButton.addEventListener("click", () => {
        listAgenda.removeChild(taskEl);
        removeTodo(todo);
      });
    });
  }

  function editTodo(todo, text) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    let index = todos.indexOf(todo);
    todos[index] = text;
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function removeTodo(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.splice(todos.indexOf(todo), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
});
