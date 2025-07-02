<!-- src/components/ListarEstudiantes.vue -->
<template>
  <div class="listar-container">
    <button @click="consultarTodos" class="btn-consultar">
      Consultar todos
    </button>

    <table v-if="estudiantes.length" class="tabla-estudiantes">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Fecha Nacimiento</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="est in estudiantes" :key="est.id">
          <td>{{ est.id }}</td>
          <td>{{ est.nombre }}</td>
          <td>{{ est.apellido }}</td>
          <td>{{ est.fechaNacimiento }}</td>
        </tr>
      </tbody>
    </table>

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
        alert('No se pudo obtener la lista de estudiantes.')
      }
    }
  }
}
</script>

<style scoped>
.listar-container {
  padding: 2rem;
}
.btn-consultar {
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  border: none;
  background-color: #3490dc;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
.btn-consultar:hover {
  background-color: #2779bd;
}

.tabla-estudiantes {
  width: 100%;
  border-collapse: collapse;
}
.tabla-estudiantes th,
.tabla-estudiantes td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: left;
}
.tabla-estudiantes th {
  background-color: #f8f9fa;
}

.sin-datos {
  font-style: italic;
  color: #666;
}
</style>
