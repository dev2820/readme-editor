import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * return className using tailwind util classes
 *
 * @param  {...string} inputs classname string array
 * @returns
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
