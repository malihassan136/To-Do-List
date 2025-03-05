let box = document.querySelector("#box");
let first_btn = document.querySelector("#first_btn");
let p1 = document.querySelector("#p1");
let p2 = document.querySelector("#p2");

let count = 1;

// Function to save tasks to local storage
const saveTasks = () => {
    taskelements=document.querySelectorAll(".closest_ans span.to_do");
    let tasks = [];
    taskelements.forEach(task => {
        tasks.push(task.innerText);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Function to load tasks from local storage
const loadTasks = () => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        createTaskElement(task);
    });
};

// Function to create a task element
const createTaskElement = (text) => {
    let outerdiv = document.createElement("div");
    let innerdiv = document.createElement("div");
    let span = document.createElement("span");
    let i1 = document.createElement("i");
    let i2 = document.createElement("i");
    let i3 = document.createElement("i");

    span.classList.add("to_do");
    span.innerText = text;
    i1.classList.add("fa-solid", "fa-check");
    i2.classList.add("fa-solid", "fa-pen");
    i3.classList.add("fa-solid", "fa-trash");
    outerdiv.classList.add("closest_ans");
    innerdiv.classList.add("task-icons");

    innerdiv.appendChild(i1);
    innerdiv.appendChild(i2);
    innerdiv.appendChild(i3);

    outerdiv.appendChild(span);
    outerdiv.appendChild(innerdiv);

    p1.insertAdjacentElement("afterend", outerdiv);

    i3.addEventListener("click", () => {
        outerdiv.remove();
        saveTasks();
    });

    i1.addEventListener("click", () => {
        let val = span.innerText;
        outerdiv.remove();
        
        let compl_input = document.createElement("span");
        compl_input.id = "compl_input";
        compl_input.innerText = val;

        let compl_div = document.createElement("div");
        compl_div.id = "compl_outer";
        compl_div.appendChild(compl_input);
        
        p2.insertAdjacentElement("afterend", compl_div);
        saveTasks();
    });

    i2.addEventListener("click", () => {
        let span_text = span.innerText;
        let span_rep_inp = document.createElement("input");
        span_rep_inp.classList.add("to_do");
        span_rep_inp.value = span_text;
        span.replaceWith(span_rep_inp);
        span_rep_inp.focus();

        span_rep_inp.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                let newSpan = document.createElement("span");
                newSpan.classList.add("to_do");
                newSpan.innerText = span_rep_inp.value;
                span_rep_inp.replaceWith(newSpan);

                outerdiv.appendChild(newSpan);
                outerdiv.appendChild(innerdiv);

                p1.insertAdjacentElement("afterend", outerdiv);
                saveTasks();
                
            }
        });
    });
};

// Function to handle adding a new task
let working = () => {
    let text = first_btn.value.trim();
    
    if (text !== "") {
        createTaskElement(text);
        saveTasks();
        first_btn.value = "";
    } else {
        alert("Please enter a task.");
    }
};

// Load tasks from local storage when the page loads
window.addEventListener("load", () => {
    loadTasks();
});

// Attach event listener to the button
box.addEventListener("click", working);

// Allow Enter key to add a task
first_btn.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        working();
    }
});