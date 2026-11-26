function createTask(data) {
  const tasks = getTasks();
  const task = { id: nextId(tasks), ...data };
  tasks.push(task);
  saveTasks(tasks);
  return task;
}