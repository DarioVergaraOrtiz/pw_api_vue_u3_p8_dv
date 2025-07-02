<!-- src/components/ConsultarEstudiante.vue -->
<template>
  <div class="consultar-container">
    <div class="input-group">
      <input
        v-model.number="idBuscado"
        type="number"
        placeholder="ID del estudiante"
      />
      <button @click="consultarUno" :disabled="!idBuscado" class="btn-consultar">
        Consultar
      </button>
    </div>

    <form v-if="estudiante" class="form-estudiante">
      <div class="campo">
        <label>ID:</label>
        <input type="text" :value="estudiante.id" readonly />
      </div>
      <div class="campo">
        <label>Nombre:</label>
        <input type="text" v-model="estudiante.nombre" />
      </div>
      <div class="campo">
        <label>Apellido:</label>
        <input type="text" v-model="estudiante.apellido" />
      </div>
      <div class="campo">
        <label>Fecha Nacimiento:</label>
        <input type="date" v-model="estudiante.fechaNacimiento" />
      </div>
    </form>

    <p v-else class="sin-resultados">
      Ingresa un ID y pulsa “Consultar” para ver los datos.
    </p>
  </div>
</template>

<script>
import { fetchEstudianteById } from '@/clients/EstudianteClient.js'

export default {
  name: 'ConsultarEstudiante',
  data() {
    return {
      idBuscado: null,
      estudiante: null
    }
  },
  methods: {
    async consultarUno() {
      try {
        const resp = await fetchEstudianteById(this.idBuscado)

        // Formatear la fecha a yyyy-MM-dd
        if (resp.fechaNacimiento) {
          const date = new Date(resp.fechaNacimiento)
          const yyyy = date.getFullYear()
          const mm = String(date.getMonth() + 1).padStart(2, '0')
          const dd = String(date.getDate()).padStart(2, '0')
          resp.fechaNacimiento = `${yyyy}-${mm}-${dd}`
        }

        this.estudiante = resp
      } catch (e) {
        console.error('Error al consultar estudiante:', e)
        alert('No se encontró un estudiante con ese ID.')
        this.estudiante = null
      }
    }
  }
}
</script>

<style scoped>
.consultar-container {
  padding: 2rem;
}
.input-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.input-group input {
  width: 150px;
  padding: 0.4rem;
}
.btn-consultar {
  padding: 0.4rem 0.8rem;
  border: none;
  background-color: #38c172;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
.btn-consultar:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.form-estudiante {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 0.75rem 1.5rem;
}
.campo {
  display: contents;
}
.campo label {
  font-weight: bold;
  align-self: center;
}
.campo input {
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.sin-resultados {
  font-style: italic;
  color: #666;
}
</style>
