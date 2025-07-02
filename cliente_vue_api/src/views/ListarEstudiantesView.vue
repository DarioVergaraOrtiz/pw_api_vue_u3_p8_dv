<!-- src/views/ListarEstudianteView.vue -->
<template>
  <div>
    <ListarEstudiantes />
  </div>
</template>

<script>
import ListarEstudiantes from '@/components/ListarEstudiantes.vue'

export default {
  name: 'AllEstudiantesView',
  components: { ListarEstudiantes }
}
</script>

<style>
/* estilos globales de la vista, si los necesitas */
</style>
