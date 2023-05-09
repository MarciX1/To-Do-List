const body = document.querySelector("body");
const textBox = document.getElementById("textBox");
const generateBtn = document.querySelector(".generateBtn");
const clearBtn = document.querySelector(".clearBtn");
const boxTwo = document.querySelector(".box-2");
const span = document.querySelector("span");
const toggleBox = document.querySelector(".toggle-box");

let tasksCounter = 1;

// Generate The divs
function generateButton() {

    // If input empty then give a alert | Else create divs etc
    if (textBox.value.trim() === "") {
        alert("You must write something");
    } else {

        const inputValue = textBox.value;
        
        const div = document.createElement("div");
        div.classList.add("todo");

        // Paragraphs
        const p1 = document.createElement("p");
        p1.classList.add("text");
        p1.innerHTML = inputValue;

        // Button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.classList.add("loaded-delete-btn");
        const deleteBtnIcon = document.createElement("i");
        deleteBtnIcon.classList.add("fa-regular", "fa-trash-can");
        deleteBtn.appendChild(deleteBtnIcon);

        // Delete div
        deleteBtn.addEventListener("click", () => {
            div.remove()
            tasksCounter--;
            span.textContent = parseInt(span.textContent) -1;
            saveData();
        });

        // Pending Tasks
        span.textContent = tasksCounter;
        tasksCounter++;
        tasksCounter = parseInt(localStorage.getItem("counter")) +1;

        // Appendchild
        div.appendChild(p1);
        div.appendChild(deleteBtn);
        boxTwo.appendChild(div);
    }
    textBox.value = "";
    saveData();
};

generateBtn.addEventListener("click", generateButton);

// Toggle Box Off-On
toggleBox.addEventListener("click", () => {
    body.classList.toggle("active");
    saveData();
});

// Loaded delete btn
boxTwo.addEventListener("click", (event) => {
    if (event.target.classList.contains("loaded-delete-btn")) {
        event.target.parentNode.remove();
        saveData();
    }
});

// Clear all divs
clearBtn.addEventListener("click", () => {
    boxTwo.innerHTML = "";
    tasksCounter = 1;
    span.textContent = 0;
    saveData();
});

// Save current data
function saveData() {
    localStorage.setItem("data", boxTwo.innerHTML);
    localStorage.setItem("counter", tasksCounter);
    localStorage.setItem("spanCounter", span.textContent);
    const bodyActive = body.classList.contains("active");
    localStorage.setItem("toggleColors", bodyActive);
}

// Load task when user gets back
function showTask() {
    boxTwo.innerHTML = localStorage.getItem("data");
    tasksCounter = parseInt(localStorage.getItem("counter"));
    span.textContent = localStorage.getItem("spanCounter");
    bodyActive = localStorage.getItem("toggleColors");

    const loadedDeleteButtons = document.querySelectorAll(".loaded-delete-btn");
    loadedDeleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            button.parentNode.remove();
            tasksCounter--;
            span.textContent = parseInt(span.textContent) -1;
            saveData();
        });
    });

    if (bodyActive === "true") {
        body.classList.add("active");
    } else {
        body.classList.remove("active");
    }

}
showTask();