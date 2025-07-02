<template>
  <div class="listar-container">
    <h2 class="titulo">📚 Lista de Estudiantes</h2>
    <button @click="consultarTodos" class="btn-consultar">
      <span class="icon">👥</span>
      Consultar todos
    </button>

    <div v-if="estudiantes.length" class="tabla-wrapper">
      <table class="tabla-estudiantes">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de Nacimiento</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="est in estudiantes" :key="est.id">
            <td>{{ est.id }}</td>
            <td>{{ est.nombre }}</td>
            <td>{{ est.apellido }}</td>
            <td>{{ formatearFecha(est.fechaNacimiento) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else class="sin-datos">No hay estudiantes para mostrar.</p>
  </div>
</template>

<script>
import { fetchAllEstudiantes } from '@/clients/EstudianteClient.js'

export default {
  name: 'ListarEstudiantes',
  data() {
    return {
      estudiantes: []
    }
  },
  methods: {
    async consultarTodos() {
      try {
        this.estudiantes = await fetchAllEstudiantes()
      } catch (e) {
        console.error('Error al consultar todos:', e)
        this.$toast.error('No se pudo obtener la lista de estudiantes.')
      }
    },
    formatearFecha(fecha) {
      const opciones = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(fecha).toLocaleDateString('es-ES', opciones)
    }
  }
}
</script>

<style scoped>
:root {
  --primary-color: #2c3e50;
  --secondary-color: #ecf0f1;
  --accent-color: #3498db;
  --text-color: #34495e;
  --highlight-color: rgba(52, 152, 219, 0.1);
}

.listar-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--secondary-color);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.titulo {
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: var(--primary-color);
  text-align: center;
}

.btn-consultar {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  margin-bottom: 1.5rem;
  border: none;
  background-color: var(--accent-color);
  color: white;
  font-weight: 600;
  border-radius: 24px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.btn-consultar:hover {
  transform: translateY(-2px);
}

.tabla-wrapper {
  overflow-x: auto;
  border-radius: 8px;
}

.tabla-estudiantes {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.tabla-estudiantes th,
.tabla-estudiantes td {
  padding: 0.75rem 1rem;
  text-align: left;
  color: var(--text-color);
}

.tabla-estudiantes th {
  background-color: var(--primary-color);
  color: black;
  text-transform: uppercase;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  position: sticky;
  top: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tabla-estudiantes tbody tr:nth-child(odd) {
  background-color: var(--secondary-color);
}

.tabla-estudiantes tbody tr:hover {
  background-color: var(--highlight-color);
}

.sin-datos {
  text-align: center;
  margin-top: 2rem;
  font-style: italic;
  color: var(--text-color);
}
</style>