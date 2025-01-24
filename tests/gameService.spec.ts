import { GameService } from '../src/services/gameService';
import { displayMessage } from '../src/services/inputService';
import { generateNumber, calculateMaxTry } from '../src/utils/numberUtils';
import { getLevelText } from '../src/utils/messageUtils';
import { CHOICES } from '../src/types/enums';

jest.mock('../src/services/inputService');
jest.mock('../src/utils/numberUtils');
jest.mock('../src/utils/messageUtils');

describe('GameService', () => {
  let gameService: GameService;

  beforeEach(() => {
    gameService = new GameService();
    jest.clearAllMocks();
  });

  test('should win the game when the correct number is guessed', async () => {
    (generateNumber as jest.Mock).mockReturnValue(50);
    (calculateMaxTry as jest.Mock).mockReturnValue(5);
    (getLevelText as jest.Mock).mockReturnValue('easy');
    (displayMessage as jest.Mock).mockResolvedValueOnce('30').mockResolvedValueOnce('50');

    const result = await gameService.startGame(CHOICES.easy);
    expect(result).toBe('win');
    expect(displayMessage).toHaveBeenCalledTimes(2);
  });

  test('should lose the game when max tries are reached', async () => {
    (generateNumber as jest.Mock).mockReturnValue(50);
    (calculateMaxTry as jest.Mock).mockReturnValue(3);
    (getLevelText as jest.Mock).mockReturnValue('medium');
    (displayMessage as jest.Mock).mockResolvedValueOnce('60').mockResolvedValueOnce('40').mockResolvedValueOnce('45');

    const result = await gameService.startGame(CHOICES.medium);
    expect(result).toBe('lose');
    expect(displayMessage).toHaveBeenCalledTimes(3);
  });

  test('should throw an error for an invalid difficulty level', async () => {
    expect.assertions(1);
    try {
      await gameService.startGame(999);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('This choice does not exist');
      }
    }
  });

  test('should show correct messages for higher and lower guesses', async () => {
    (generateNumber as jest.Mock).mockReturnValue(75);
    (calculateMaxTry as jest.Mock).mockReturnValue(3);
    (getLevelText as jest.Mock).mockReturnValue('hard');
    (displayMessage as jest.Mock).mockResolvedValueOnce('50').mockResolvedValueOnce('100').mockResolvedValueOnce('75');

    const result = await gameService.startGame(CHOICES.hard);
    expect(result).toBe('win');
    expect(displayMessage).toHaveBeenCalledTimes(3);
  });
});
