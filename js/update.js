function startEdit(id) {
  const task = getTasks().find(t => t.id === id);
  if (!task) return;

  document.getElementById('titulo').value = task.titulo;
  document.getElementById('materia').value = task.materia;
  document.getElementById('fecha').value = task.fecha;
  document.getElementById('estado').value = task.estado;

  editingId = id;
  document.getElementById('submit-btn').textContent = 'Actualizar';
  document.getElementById('cancel-edit').hidden = false;
  document.getElementById('titulo').focus();
}

function updateTask(id, data) {
  const tasks = getTasks().map(t => (t.id === id ? { ...t, ...data } : t));
  saveTasks(tasks);
}