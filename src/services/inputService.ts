import { input } from '@inquirer/prompts';

export async function displayMessage(message: string): Promise<string> {
  return await input({ message });
}
