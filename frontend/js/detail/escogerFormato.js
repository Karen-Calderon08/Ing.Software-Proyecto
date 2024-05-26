export const escogerFormato = () => {
  const vinilo = document?.querySelector('#vinilo')
  const mp3 = document?.querySelector('#mp3')
  const contadorStock = document?.querySelector('#contador-productos')

  vinilo?.addEventListener('change', () => {
    if (vinilo.checked) {
      contadorStock.style.display = 'flex'
    } else {
      contadorStock.style.display = 'none'
    }
  })

  mp3?.addEventListener('change', () => {
    if (mp3.checked) {
      contadorStock.style.display = 'none'
    } else {
      contadorStock.style.display = 'flex'
    }
  })
}
