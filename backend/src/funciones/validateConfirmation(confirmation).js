import { z } from 'zod';

const confirmRejectSchema = z.enum(['confirmar', 'rechazar']);

function validateConfirmation(confirmation) {
  try {
    confirmRejectSchema.parse(confirmation);
    return true;
  } catch (error) {
    return false;
  }
}
