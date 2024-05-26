const signInForm = document.querySelector('#signin')

signInForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  const correo = event.target[0].value
  const contrasena = event.target[1].value
  const response = await fetch(
    `${import.meta.env.VITE_LOCAL_URL}/api/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correo,
        contrasena
      })
    }
  )
  if (response.ok) {
    const data = await response.json()
    localStorage.setItem('token', data.token)
    alert('Usuario logueado exitosamente')
    window.location.href = '/index.html'
    return
  }
  alert('Usuario o contraseña incorrectos')
})
