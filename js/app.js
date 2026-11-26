const form = document.getElementById('task-form');
const errorBox = document.getElementById('form-errors');
const cancelBtn = document.getElementById('cancel-edit');
const tasksBody = document.getElementById('tasks-body');
let editingId = null;

function getFormData() {
  return {
    titulo: document.getElementById('titulo').value.trim(),
    materia: document.getElementById('materia').value.trim(),
    fecha: document.getElementById('fecha').value,
    estado: document.getElementById('estado').value
  };
}

function resetForm() {
  form.reset();
  editingId = null;
  document.getElementById('submit-btn').textContent = 'Guardar';
  cancelBtn.hidden = true;
}

function showErrors(errors) {
  errorBox.innerHTML = errors.map(e => `<li>${e}</li>`).join('');
}

function refresh() {
  if (typeof renderTasks === 'function') renderTasks();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = getFormData();

  const errors = typeof validateTask === 'function' ? validateTask(data) : [];
  if (errors.length) {
    showErrors(errors);
    return;
  }
  showErrors([]);

  if (editingId !== null && typeof updateTask === 'function') {
    updateTask(editingId, data);
  } else if (typeof createTask === 'function') {
    createTask(data);
  }

  resetForm();
  refresh();
});

cancelBtn.addEventListener('click', resetForm);

tasksBody.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const id = Number(btn.dataset.id);

  if (btn.dataset.action === 'edit' && typeof startEdit === 'function') {
    startEdit(id);
  }
  if (btn.dataset.action === 'delete' && typeof deleteTask === 'function') {
    deleteTask(id);
    refresh();
  }
});

document.addEventListener('DOMContentLoaded', refresh);