function deleteTask(id) {
  if (!confirm('¿Eliminar esta tarea?')) return;

  const tasks = getTasks().filter(t => t.id !== id);
  saveTasks(tasks);

  if (editingId === id) resetForm();
}