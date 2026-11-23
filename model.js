// model.ts
let nextId = 1;
// Add a new task — always starts as "todo".
export function addTask(tasks, title) {
    const newTask = { id: nextId++, title, status: "todo" };
    return [...tasks, newTask];
}
// Advance a task's status: "todo" -> "in-progress" -> "done".
export function advanceTask(tasks, id) {
    return tasks.map((t) => {
        if (t.id !== id)
            return t;
        const nextStatus = t.status === "todo" ? "in-progress" : "done";
        return { ...t, status: nextStatus };
    });
}
// Mark a task done by id.
export function completeTask(tasks, id) {
    return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}
// Delete a task by id.
export function deleteTask(tasks, id) {
    return tasks.filter((t) => t.id !== id);
}
// Return only the tasks matching a given status.
export function filterByStatus(tasks, status) {
    return tasks.filter((t) => t.status === status);
}
