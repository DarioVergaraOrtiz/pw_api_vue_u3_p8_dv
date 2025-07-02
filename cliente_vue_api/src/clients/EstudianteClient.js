// src/clients/EstudianteClient.js
import axios from 'axios'

const API_BASE = 'http://localhost:8081/api/matricula/v1/estudiantes'

export async function fetchAllEstudiantes() {
  const resp = await axios.get(`${API_BASE}`)
  return resp.data
}

export async function fetchEstudianteById(id) {
  const resp = await axios.get(`${API_BASE}/${id}`)
  return resp.data
}
