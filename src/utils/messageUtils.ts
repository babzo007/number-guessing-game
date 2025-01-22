import { CHOICES } from '../types/enums.js';

export function getLevelText(choice: number): string {
  switch (choice) {
    case CHOICES.easy:
      return 'easy';
    case CHOICES.medium:
      return 'medium';
    case CHOICES.hard:
      return 'hard';
    default:
      throw new Error('This level of difficulty does not exist');
  }
}
