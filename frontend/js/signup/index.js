const signUpForm = document.querySelector('#signup')

signUpForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  console.log(event)
  const nombre = event.target[0].value
  const apellido = event.target[1].value
  const correo = event.target[2].value
  const contrasena = event.target[3].value
  const direccion = event.target[4].value
  const rol = event.target[5].value

  try {
    const response = await fetch(
      `${import.meta.env.VITE_LOCAL_URL}/api/cliente/crear`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre,
          apellido,
          correo,
          contrasena,
          direccion,
          tipoUsuario: rol
        })
      }
    )
    const data = await response.json()
    if (response.status === 200) {
      alert('Usuario creado exitosamente')
      window.location.href = '/signin.html'
      return
    }

    alert(`Error al crear el usuario: ${data.errors[0].message}`)
  } catch (error) {
    alert('Error al crear el usuario: intentelo mas tarde')
  }
})
