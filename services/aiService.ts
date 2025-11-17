import type { AIModule, GroundingSource } from '../types';

/**
 * Defines the standard contract for any AI service. 
 * This allows the application to seamlessly switch between different providers 
 * like Google Gemini, OpenAI, Anthropic, etc.
 */
export interface AIService {
  handleChatQuery(query: string, aiContext: string): Promise<string>;
  
  generateNextGoal(
    modules: AIModule[], 
    previousGoal: string, 
    hasCodeToDeploy: boolean,
    userInstruction: string | null
  ): Promise<{ goal: string, targetModuleId: string }>;

  generateNewModule(prompt: string, existingModules: AIModule[]): Promise<Omit<AIModule, 'icon'>>;

  performWebSearch(prompt: string): Promise<{ text: string, sources: GroundingSource[] }>;

  generateCode(prompt: string): Promise<string>;

  generateThemeCSS(prompt: string): Promise<string>;

  generateTextResponse(module: AIModule, prompt: string): Promise<string>;
}
