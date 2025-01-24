import { displayMessage } from './inputService.js';
import { generateNumber, calculateMaxTry } from '../utils/numberUtils.js';
import { getLevelText } from '../utils/messageUtils.js';

export class GameService {
  duration: number;
  startTime: number;
  constructor() {
    this.duration = 0;
    this.startTime = 0;
  }
  async startGame(choice: number): Promise<string> {
    const guessNumber = generateNumber();

    this.startTime = Date.now();

    let guess = await displayMessage(
      `Great! You have selected the ${getLevelText(
        choice,
      )} difficulty level.\nLet's start the game!\nEnter your guess: `,
    ); // first guess

    const maxTry = calculateMaxTry(choice);
    let remainingGuess = maxTry;

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
      this.duration = this.trackGameDuration(this.startTime, Date.now());
      console.log(
        `You didn't guess the number. The correct number was ${guessNumber}. It tooks ${Math.floor(
          this.duration / 1000,
        )} seconds.`,
      );
      return 'lose';
    } else {
      this.duration = this.trackGameDuration(this.startTime, Date.now());
      console.log(
        `Congratulations! You guessed the correct number in ${
          maxTry - remainingGuess
        } attempt(s). It tooks ${Math.floor(this.duration / 1000)} seconds.`,
      );
      return 'win';
    }
  }

  private trackGameDuration(startTime: number, endTime: number): number {
    return endTime - startTime;
  }
}
