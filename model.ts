// model.ts

// A status can only ever be one of these three exact strings.
export type TaskStatus = "todo" | "in-progress" | "done";

// Every Task must have this exact shape.
export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

let nextId = 1;

// Add a new task — always starts as "todo".
export function addTask(tasks: Task[], title: string): Task[] {
  const newTask: Task = { id: nextId++, title, status: "todo" };
  return [...tasks, newTask];
}

// Advance a task's status: "todo" -> "in-progress" -> "done".
export function advanceTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t) => {
    if (t.id !== id) return t;
    const nextStatus: TaskStatus =
      t.status === "todo" ? "in-progress" : "done";
    return { ...t, status: nextStatus };
  });
}

// Mark a task done by id.
export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}

// Delete a task by id.
export function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((t) => t.id !== id);
}

// Return only the tasks matching a given status.
export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((t) => t.status === status);
}
