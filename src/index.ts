import { displayConfirm, displayMessage } from './services/inputService.js';
import { GameService } from './services/gameService.js';

async function main() {
  const welcomeMessage =
    "Welcome to the Number Guessing Game!\nI'm thinking of a number between 1 and 100.\n\n" +
    'Please select the difficulty level:\n' +
    '1. Easy (10 chances)\n2. Medium (5 chances)\n3. Hard (3 chances)\n\nEnter your choice:';

  const choice = await displayMessage(welcomeMessage);
  const gameService = new GameService();
  await gameService.startGame(Number(choice));

  let playAgain = true;

  while (playAgain) {
    playAgain = await displayConfirm('Do you want to play again? (yes/no)');

    if (playAgain) {
      const choice = await displayMessage(welcomeMessage);
      await gameService.startGame(Number(choice));
    }
  }
}

main();
