import { CHOICES } from '../types/enums.js';

export function generateNumber(): number {
  return Math.floor(Math.random() * 100) + 1;
}

export function calculateMaxTry(choice: number): number {
  switch (choice) {
    case CHOICES.easy:
      return 10;
    case CHOICES.medium:
      return 5;
    case CHOICES.hard:
      return 3;
    default:
      throw new Error('This choice does not exist');
  }
}
