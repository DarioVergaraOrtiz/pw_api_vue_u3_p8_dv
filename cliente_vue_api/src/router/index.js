import { createRouter, createWebHistory } from 'vue-router'
import AllEstudiantesView from '@/views/ListarEstudiantesView.vue'
import EstudiantePorIdView from '@/views/ConsultarEstudianteView.vue'

const routes = [
  { path: '/estudiantes', component: AllEstudiantesView },
  { path: '/estudiante', component: EstudiantePorIdView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})