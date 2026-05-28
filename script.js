const user =
localStorage.getItem("loggedInUser");

if(!user){
    window.location.href =
    "login.html";
}

document.getElementById(
    "welcomeText"
).innerText =
`Welcome, ${user}`;

const logoutBtn =
document.getElementById("logoutBtn");

logoutBtn.addEventListener(
"click", () => {

    localStorage.removeItem(
        "loggedInUser"
    );

    window.location.href =
    "login.html";
});

let tasks =
JSON.parse(localStorage.getItem("tasks"))
|| [];

function saveTasks(){
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function renderTasks(){

    const pending =
    document.getElementById(
        "pendingTasks"
    );

    const completed =
    document.getElementById(
        "completedTasks"
    );

    pending.innerHTML = "";
    completed.innerHTML = "";

    tasks.forEach((task,index)=>{

        const card =
        document.createElement("div");

        card.className =
        "task-card";

        card.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>

        <div class="task-buttons">

        <button class="complete-btn">
        ${task.completed ?
        "Undo" : "Complete"}
        </button>

        <button class="edit-btn">
        Edit
        </button>

        <button class="delete-btn">
        Delete
        </button>

        </div>
        `;

        const buttons =
        card.querySelectorAll(
        "button"
        );

        buttons[0].onclick =
        ()=>{

            task.completed =
            !task.completed;

            saveTasks();
            renderTasks();
        };

        buttons[1].onclick =
        ()=>{

            const newTitle =
            prompt(
            "Edit Title",
            task.title
            );

            const newDesc =
            prompt(
            "Edit Description",
            task.description
            );

            if(newTitle !== null){

                task.title =
                newTitle;

                task.description =
                newDesc;

                saveTasks();
                renderTasks();
            }
        };

        buttons[2].onclick =
        ()=>{

            tasks.splice(index,1);

            saveTasks();
            renderTasks();
        };

        if(task.completed){
            completed.appendChild(card);
        }
        else{
            pending.appendChild(card);
        }
    });
}

document.getElementById(
"addTaskBtn"
).addEventListener(
"click", ()=>{

    const title =
    document.getElementById(
    "taskTitle"
    ).value;

    const desc =
    document.getElementById(
    "taskDesc"
    ).value;

    if(title.trim() === ""){
        alert("Enter task title");
        return;
    }

    tasks.push({
        title: title,
        description: desc,
        completed: false
    });

    saveTasks();
    renderTasks();

    document.getElementById(
    "taskTitle"
    ).value = "";

    document.getElementById(
    "taskDesc"
    ).value = "";
});

renderTasks();