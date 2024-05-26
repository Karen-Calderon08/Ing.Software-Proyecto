const signUpForm = document.querySelector('#subir')

signUpForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  console.log(event)
  const nombre = event.target[0].value
  const artista = event.target[1].value
  const caratula = event.target[2].value
  const precio = Number(event.target[3].value)
  const stock = Number(event.target[4].value)
  console.log({ nombre, artista, caratula, precio, stock })

  try {
    const response = await fetch('http://localhost:3000/api/cancion/registrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre,
        artista,
        caratula,
        vinilo: {
          precio,
          stock
        }
      })
    })
    const data = await response.json()
    if (response.status === 200) {
      alert('Registro Exitoso')
      window.location.href = '/'
      return
    }

    alert(`Error al crear el usuario: ${data.errors[0].message}`)
  } catch (error) {
    alert('Error al crear el usuario: intentelo mas tarde')
  }
})
