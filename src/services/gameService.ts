import { displayMessage } from './inputService.js';
import { generateNumber, calculateMaxTry } from '../utils/numberUtils.js';
import { getLevelText } from '../utils/messageUtils.js';

export class GameService {
  async startGame(choice: number): Promise<string> {
    await displayMessage(
      `Great! You have selected the ${getLevelText(choice)} difficulty level.\nLet's start the game!`,
    );

    const maxTry = calculateMaxTry(choice);
    let remainingGuess = maxTry;
    const guessNumber = generateNumber();

    let guess = await displayMessage(`Enter your guess: `); // first guess
    remainingGuess--;

    while (guessNumber !== Number(guess) && remainingGuess > 0) {
      if (guessNumber < Number(guess)) {
        guess = await displayMessage(`Incorrect! The number is less than ${guess}.\n\nEnter your guess: `);
      } else if (guessNumber > Number(guess)) {
        guess = await displayMessage(`Incorrect! The number is greater than ${guess}.\n\nEnter your guess: `);
      }

      remainingGuess--;
    }

    return this.showResult(guessNumber, remainingGuess, maxTry);
  }

  private showResult(guessNumber: number, remainingGuess: number, maxTry: number): string {
    if (remainingGuess === 0) {
      console.log(`You didn't guess the number. The correct number was ${guessNumber}`);
      return 'lose';
    } else {
      console.log(`Congratulations! You guessed the correct number in ${maxTry - remainingGuess} attempt(s)`);
      return 'win';
    }
  }
}
