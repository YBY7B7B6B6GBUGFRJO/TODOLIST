// app.ts
import { addTask, advanceTask, deleteTask, filterByStatus } from "./model.js";
let tasks = [];
let filter = "all";
// Grab elements — cast so tsc knows exactly what they are.
const titleInput = document.getElementById("title");
const addBtn = document.getElementById("add");
const listEl = document.getElementById("list");
addBtn.onclick = () => {
    const title = titleInput.value.trim(); // .value is known & typed
    if (!title)
        return;
    tasks = addTask(tasks, title); // returns a fresh Task[]
    render();
};
function render() {
    // 1. Pick which tasks to show (filterByStatus is typed to TaskStatus)
    const shown = filter === "all" ? tasks : filterByStatus(tasks, filter);
    // 2. Clear the old rows
    listEl.innerHTML = "";
    // 3. Build one <li> per task
    for (const t of shown) {
        const li = document.createElement("li");
        li.className = "task";
        // Task title
        const titleSpan = document.createElement("span");
        titleSpan.textContent = t.title;
        // Status badge
        const badge = document.createElement("span");
        badge.className = `badge ${t.status}`;
        badge.textContent = t.status;
        // Advance button
        const advanceBtn = document.createElement("button");
        advanceBtn.textContent = t.status === "done" ? "✓ done" : "advance →";
        advanceBtn.disabled = t.status === "done";
        advanceBtn.onclick = () => {
            tasks = advanceTask(tasks, t.id);
            render();
        };
        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✕";
        deleteBtn.onclick = () => {
            tasks = deleteTask(tasks, t.id);
            render();
        };
        // Assemble and append the row
        li.append(titleSpan, badge, advanceBtn, deleteBtn);
        listEl.appendChild(li);
    }
}
render();
