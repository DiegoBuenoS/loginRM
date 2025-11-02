/**
 * Utilitário para concatenar classes CSS
 * 
 * Combina múltiplas classes CSS de forma eficiente,
 * removendo valores falsos e duplicatas.
 * 
 * @param {...any} inputs - Classes CSS a serem combinadas
 * @returns {string} Classes CSS concatenadas
 */

import { clsx } from 'clsx';

export function cn(...inputs) {
  return clsx(inputs);
}
