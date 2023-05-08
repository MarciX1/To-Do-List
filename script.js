const textBox = document.getElementById("textBox");
const generateBtn = document.querySelector(".generateBtn");
const clearBtn = document.querySelector(".clearBtn");
const boxTwo = document.querySelector(".box-2");
const span = document.querySelector("span");

let tasksCounter = 1;

// Generate The divs
generateBtn.addEventListener("click", () => {

    // If input empty then give a alert | Else create divs etc
    if (textBox.value === "") {
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
        const deleteBtnIcon = document.createElement("i");
        deleteBtnIcon.classList.add("fa-regular", "fa-trash-can");
        deleteBtn.appendChild(deleteBtnIcon);

        // Delete div
        deleteBtn.addEventListener("click", () => {
            div.remove()
            tasksCounter -=1;
            span.textContent -=1;
        });

        // Pending Tasks 
        span.textContent = tasksCounter;
        tasksCounter++;

        // Appendchild
        div.appendChild(p1);
        div.appendChild(deleteBtn);
        boxTwo.appendChild(div);
    }
    textBox.value = "";
});


// Clear all divs
clearBtn.addEventListener("click", () => {
    boxTwo.innerHTML = "";
    tasksCounter = 1;
    span.textContent = 0;
});