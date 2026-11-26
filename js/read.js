function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function todayISO() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

function formatDate(iso) {
  if (!iso) return '';
  const [year, month, day] = iso.split('-');
  return `${day}/${month}/${year}`;
}

function badgeClass(estado) {
  return 'badge--' + estado.toLowerCase().replace(/\s+/g, '-');
}

function updateStats(tasks) {
  const count = (estado) => tasks.filter(t => t.estado === estado).length;
  document.getElementById('stat-total').textContent = tasks.length;
  document.getElementById('stat-pendiente').textContent = count('Pendiente');
  document.getElementById('stat-progreso').textContent = count('En progreso');
  document.getElementById('stat-entregada').textContent = count('Entregada');
}

function renderTasks() {
  const tasks = getTasks();
  const body = document.getElementById('tasks-body');
  const empty = document.getElementById('empty-msg');
  const today = todayISO();

  body.innerHTML = tasks.map(t => {
    const late = t.fecha && t.fecha < today && t.estado !== 'Entregada';
    return `
      <tr>
        <td>${escapeHtml(t.titulo)}</td>
        <td>${escapeHtml(t.materia)}</td>
        <td class="${late ? 'due--late' : ''}">${formatDate(t.fecha)}</td>
        <td><span class="badge ${badgeClass(t.estado)}">${escapeHtml(t.estado)}</span></td>
        <td>
          <div class="row-actions">
            <button type="button" class="ghost" data-action="edit" data-id="${t.id}">Editar</button>
            <button type="button" class="ghost danger" data-action="delete" data-id="${t.id}">Eliminar</button>
          </div>
        </td>
      </tr>`;
  }).join('');

  empty.hidden = tasks.length > 0;
  updateStats(tasks);
}