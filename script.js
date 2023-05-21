const body = document.querySelector("body");
const textBox = document.getElementById("textBox");
const generateBtn = document.querySelector(".generateBtn");
const clearBtn = document.querySelector(".clearBtn");
const boxTwo = document.querySelector(".box-2");
const taskCounter = document.getElementById("task-counter");
const toggleBox = document.querySelector(".toggle-box");
const inputCounter = document.getElementById("counter");

// Update Counter
const maxChars = 50;

// Input updatecounter on type and color add if reached max
textBox.addEventListener("input", function() {
  updateCounter();
  counterColor();
});

function updateCounter() {
  const inputLength = textBox.value.length;
  if (inputLength > maxChars) {
    textBox.value = textBox.value.slice(0, maxChars);
    inputCounter.textContent = maxChars.toString();
  } else {
    inputCounter.textContent = inputLength.toString();
  }
}

function counterColor() {
  if (textBox.value.length == maxChars) {
    inputCounter.classList.add("counterColor");
  } else {
    inputCounter.classList.remove("counterColor");
  }
}

let tasksCounter = 0;

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
      taskCounter.textContent = parseInt(taskCounter.textContent) - 1;
      saveData();
    });

    // Pending Tasks
    tasksCounter++;
    taskCounter.textContent = tasksCounter;
    const counterValue = localStorage.getItem("counter");
    tasksCounter = counterValue ? parseInt(counterValue) + 1 : 1;

    // Appendchild
    div.appendChild(p1);
    div.appendChild(deleteBtn);
    boxTwo.appendChild(div);

  }
  // Reset inputCounter after clicked the button, reset textbox
  inputCounter.textContent = 0;
  inputCounter.classList.remove("counterColor");
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
  tasksCounter = 0;
  taskCounter.textContent = tasksCounter;
  saveData();
});

// Save current data
function saveData() {
  localStorage.setItem("data", boxTwo.innerHTML);
  localStorage.setItem("counter", tasksCounter);
  localStorage.setItem("taskCounter", taskCounter.textContent);
  const bodyActive = body.classList.contains("active");
  localStorage.setItem("toggleColors", bodyActive);
}

// Load task when user gets back
function showTask() {
  boxTwo.innerHTML = localStorage.getItem("data");
  const counterValue = localStorage.getItem("counter");
  tasksCounter = counterValue ? parseInt(counterValue) : 0;
  taskCounter.textContent = localStorage.getItem("taskCounter") || 0;
  bodyActive = localStorage.getItem("toggleColors");

  const loadedDeleteButtons = document.querySelectorAll(".loaded-delete-btn");

  loadedDeleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.parentNode.remove();
      tasksCounter--;
      taskCounter.textContent = parseInt(taskCounter.textContent) - 1;
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