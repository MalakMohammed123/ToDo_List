let taskinput = document.getElementById("task");
let btnadd = document.getElementById("btn");
let message = document.getElementById("message");
let btnall = document.getElementById("btnall");
let btnact = document.getElementById("btnact");
let btncomp = document.getElementById("btncomp");

let tasks = [];
let currentfilter = "all";
btnadd.addEventListener("click", () => {
    let tasktext = taskinput.value;
    if (tasktext === "") {
        return;
    }
    let task = {
        id: Date.now(),
        text: tasktext,
        completed: false
    };
    tasks.push(task);

    taskinput.value = "";

    showtasks();
});
function showtasks() {
    message.innerHTML = "";

    let sortedtasks = tasks.filter(function (task) {
        if (currentfilter === "active") {

            return task.completed === false;
        }
        if (currentfilter === "completed") {
            return task.completed === true;
        }
        return true;
    });

    if (sortedtasks.length === 0) {
        let emptymessage = document.createElement("p");
        emptymessage.textContent = "No tasks yet. Add new one!";
        emptymessage.className = "message";
        message.appendChild(emptymessage);
    }
    
    sortedtasks.forEach(function (task) {
        let newTask = document.createElement("div");
        newTask.className = "task-item";
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        let taskname = document.createElement("span");
        taskname.textContent = task.text;
        if (task.completed) {
            taskname.classList.add("completed");
        }

        let deletebtn = document.createElement("button");
        deletebtn.textContent = "Delete";
        deletebtn.className = "deletebtn";
        
        newTask.appendChild(checkbox);
        newTask.appendChild(taskname);
        newTask.appendChild(deletebtn);
        message.appendChild(newTask);

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            showtasks();
        });

         deletebtn.addEventListener("click", () => {
             tasks = tasks.filter(function (item) {
                 return item.id !== task.id;
             });
             showtasks();
         });
        
    });
    let activecount = tasks.filter(function (task) {
        return task.completed === false;
    }).length;
    let completedcount = tasks.filter(function (task) {
        return task.completed === true;
    }).length;
    
    btnall.textContent = "All (" + tasks.length + ")";
    btnact.textContent = "Active (" + activecount + ")";
    btncomp.textContent = "Completed (" + completedcount + ")";
}
btnall.addEventListener("click", () => {
    currentfilter = "all";
    showtasks();
});
btnact.addEventListener("click", () => {
    currentfilter = "active";
    showtasks();
});
btncomp.addEventListener("click", () => {
    currentfilter = "completed";
    showtasks();
});
showtasks();
