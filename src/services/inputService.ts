import { confirm, input } from '@inquirer/prompts';

export async function displayMessage(message: string): Promise<string> {
  return await input({ message });
}

export async function displayConfirm(message: string): Promise<boolean> {
  return await confirm({ message });
}
