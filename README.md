# 🎓 CRUD de Estudiantes con Supabase

Este es un proyecto web que permite **registrar, listar, buscar, editar y eliminar estudiantes**. Utiliza **Supabase** como base de datos en la nube y está desarrollado con HTML, CSS y JavaScript puro.

---

## 🚀 Funcionalidades

- 📥 Registrar nuevos estudiantes.
- 📋 Ver listado completo desde Supabase.
- 🔍 Buscar por nombre.
- ✏️ Editar registros.
- 🗑️ Eliminar estudiantes.
- 🌐 Conexión en tiempo real con la nube usando Supabase.

---

## 🧱 Tecnologías usadas

- **HTML5** — estructura del contenido.
- **CSS3** — diseño moderno y responsive.
- **JavaScript (ES6+)** — lógica del CRUD.
- **Supabase** — base de datos y backend instantáneo.

---

## 🛠️ Requisitos

- Cuenta gratuita en [Supabase](https://supabase.com)
- Crear una tabla llamada `registro` con los siguientes campos:

| Campo     | Tipo   | Requerido |
|-----------|--------|-----------|
| id        | int8   | ✔️ (PK, autoincremental) |
| nombre    | text   | ✔️ NOT NULL |
| edad      | int4   | ✔️ NOT NULL |
| grado     | text   | ✔️ NOT NULL |
| seccion   | text   | ✔️ NOT NULL |

---

## 🔌 Configuración de Supabase

1. Entra a tu proyecto en [Supabase](https://supabase.com).
2. Copia tu **Project URL** y tu **Anon Key** desde `Settings > API`.
3. En `script.js`, reemplaza lo siguiente:

