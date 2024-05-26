import { jwtDecode } from 'jwt-decode'

export function obtenerUsuarioActivo() {
  const token = localStorage.getItem('token')
  if (token === null) return null
  const decoded = jwtDecode(token)
  return decoded.cliente
}
