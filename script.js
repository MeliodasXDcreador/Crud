const { createClient } = window.supabase;

const supaBaseUrl = 'https://knmaktudccgscqqxsjid.supabase.co';
const supaBaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtubWFrdHVkY2Nnc2NxcXhzamlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NTkyODksImV4cCI6MjA2NDEzNTI4OX0.YOWrplNhL_V2uOARXt88kh9CGVOgR_p3SWfIl_Y5pkM';

const supaBase = createClient(supaBaseUrl, supaBaseKey);

// 🔄 Cargar registros al iniciar
document.addEventListener('DOMContentLoaded', cargarEstudiantes);

// 🚀 Cargar estudiantes
async function cargarEstudiantes() {
  const { data, error } = await supaBase.from('registro').select('*').order('id');
  if (error) {
    console.error('Error al cargar estudiantes:', error);
    return;
  }
  renderizarEstudiantes(data);
}

// 🎯 Registrar estudiante
document.getElementById('btnGuardarAlumno').addEventListener('click', async () => {
  const nombre = document.getElementById('inputNombre').value;
  const edad = parseInt(document.getElementById('inputEdad').value);
  const grado = document.getElementById('inputGrado').value;
  const seccion = document.getElementById('inputSeccion').value;

  if (!nombre || !edad || !grado || !seccion) {
    alert('Completa todos los campos');
    return;
  }

  const { error } = await supaBase.from('registro').insert([{ nombre, edad, grado, seccion }]);
  if (error) {
    console.error('Error al registrar:', error);
    return;
  }

  limpiarFormulario();
  cargarEstudiantes();
});

// ❌ Limpiar formulario
document.getElementById('btnResetFormulario').addEventListener('click', limpiarFormulario);

function limpiarFormulario() {
  document.getElementById('inputNombre').value = '';
  document.getElementById('inputEdad').value = '';
  document.getElementById('inputGrado').value = '';
  document.getElementById('inputSeccion').value = '';
}

// 🔍 Buscar estudiante
document.getElementById('btnBuscarAlumno').addEventListener('click', async () => {
  const texto = document.getElementById('inputBuscarAlumno').value.toLowerCase();

  const { data, error } = await supaBase.from('registro').select('*');
  if (error) {
    console.error('Error al buscar:', error);
    return;
  }

  const filtrados = data.filter(e => e.nombre.toLowerCase().includes(texto));
  renderizarEstudiantes(filtrados);
});

// 🗑️ Eliminar estudiante
async function eliminarEstudiante(id) {
  const { error } = await supaBase.from('registro').delete().eq('id', id);
  if (error) {
    console.error('Error al eliminar:', error);
    return;
  }
  cargarEstudiantes();
}

// ✏️ Editar estudiante (solo nombre en este ejemplo)
async function editarEstudiante(id, nombreActual) {
  const nuevoNombre = prompt('Editar nombre:', nombreActual);
  if (!nuevoNombre) return;

  const { error } = await supaBase.from('registro').update({ nombre: nuevoNombre }).eq('id', id);
  if (error) {
    console.error('Error al editar:', error);
    return;
  }

  cargarEstudiantes();
}

// 🖥️ Mostrar estudiantes en tabla
function renderizarEstudiantes(estudiantes) {
  const cuerpoTabla = document.getElementById('cuerpoTablaAlumnos');
  cuerpoTabla.innerHTML = '';

  estudiantes.forEach((e, i) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${i + 1}</td>
      <td>${e.nombre}</td>
      <td>${e.edad}</td>
      <td>${e.grado}</td>
      <td>${e.seccion}</td>
      <td>
        <button class="btn-editar" onclick="editarEstudiante(${e.id}, '${e.nombre}')">✏️</button>
        <button class="btn-eliminar" onclick="eliminarEstudiante(${e.id})">🗑️</button>
      </td>
    `;
    cuerpoTabla.appendChild(fila);
  });
}
