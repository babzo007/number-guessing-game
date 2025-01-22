import { displayMessage } from './services/inputService.js';
import { GameService } from './services/gameService.js';

async function main() {
  const welcomeMessage =
    "Welcome to the Number Guessing Game!\nI'm thinking of a number between 1 and 100.\n" +
    'You have 5 chances to guess the correct number.\n\nPlease select the difficulty level:\n' +
    '1. Easy (10 chances)\n2. Medium (5 chances)\n3. Hard (3 chances)\n\nEnter your choice:';

  const choice = await displayMessage(welcomeMessage);
  const gameService = new GameService();

  await gameService.startGame(Number(choice));
}

main();
