import { createRouter, createWebHistory } from 'vue-router'
import AllEstudiantesView from '@/views/AllEstudiantes.vue'
import EstudiantePorIdView from '@/views/EstudiantePorId.vue'

const routes = [
  { path: '/estudiantes', component: AllEstudiantesView },
  { path: '/estudiante', component: EstudiantePorIdView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})