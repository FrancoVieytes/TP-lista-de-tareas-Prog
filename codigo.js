const input = document.getElementById('tarea');
const btnAgregar = document.getElementById('agregar');
const lista = document.getElementById('lista');
const filtro = document.getElementById('filtro');

let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

btnAgregar.addEventListener('click', agregar);
input.addEventListener('keypress', e => e.key === 'Enter' && agregar());
filtro.addEventListener('change', mostrar);
input.addEventListener('input', () => input.classList.remove('error'));

function agregar() {
  const texto = input.value.trim();
  if (!texto) {
    input.classList.add('error');
    return;
  }
  tareas.push({ texto, completada: false });
  guardar();
  mostrar();
  input.value = '';
}

function mostrar() {
  lista.innerHTML = '';
  const f = filtro.value;

  tareas.forEach((t, i) => {
    if ((f === 'completadas' && !t.completada) || (f === 'pendientes' && t.completada)) return;

    const li = document.createElement('li');
    if (t.completada) li.classList.add('completada');

    const span = document.createElement('span');
    span.textContent = t.texto;
    span.onclick = () => {
      t.completada = !t.completada;
      guardar();
      mostrar();
    };

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.onclick = () => {
      const nuevo = prompt('Editar tarea:', t.texto);
      if (nuevo !== null && nuevo.trim()) {
        t.texto = nuevo.trim();
        guardar();
        mostrar();
      }
    };

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.onclick = () => {
      tareas.splice(i, 1);
      guardar();
      mostrar();
    };

    li.append(span, btnEditar, btnEliminar);
    lista.appendChild(li);
  });
}

function guardar() {
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

mostrar();
