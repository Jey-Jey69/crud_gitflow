function validateTask(data) {
  const errors = [];

  if (!data.titulo) {
    errors.push('El título es obligatorio.');
  } else if (data.titulo.length < 3) {
    errors.push('El título debe tener al menos 3 caracteres.');
  } else if (data.titulo.length > 80) {
    errors.push('El título no puede pasar de 80 caracteres.');
  }

  if (!data.materia) {
    errors.push('La materia es obligatoria.');
  }

  if (!data.fecha) {
    errors.push('La fecha de entrega es obligatoria.');
  }

  const estados = ['Pendiente', 'En progreso', 'Entregada'];
  if (!estados.includes(data.estado)) {
    errors.push('El estado no es válido.');
  }

  return errors;
}