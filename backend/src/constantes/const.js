import { z } from 'zod'

export const formatoCancion = z.union([z.literal('vinilo'), z.literal('mp3'), z.literal('VINILO'), z.literal('MP3')])
