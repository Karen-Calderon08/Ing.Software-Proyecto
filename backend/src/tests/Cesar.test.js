import { test, expect } from '@jest/globals';
import { crearEnlaceCompartirCancion } from '../funciones/crearEnlaceCompartirCancion.js';

test('Crea un enlace para compartir una canción', () => {
  const cancion = {
    titulo: 'Canción de ejemplo',
    artista: 'Artista Ejemplo',
    formato: 'mp3'
  };

  const enlaceEsperado = 'https://ejemplo.com/compartir?titulo=Canci%C3%B3n%20de%20ejemplo&artista=Artista%20Ejemplo&formato=mp3';

  expect(crearEnlaceCompartirCancion(cancion)).toBe(enlaceEsperado);
});

export function crearEnlaceCompartirCancion(cancion) {
    const { titulo, artista, formato } = cancion;
    const parametros = new URLSearchParams({
      titulo: titulo,
      artista: artista,
      formato: formato
    });
    return `https://ejemplo.com/compartir?${parametros.toString()}`;
  }
  