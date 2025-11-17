import { GoogleGenAI, Type } from "@google/genai";
import type { AIModule, GroundingSource } from '../types';
import type { AIService } from "./aiService";
import { getApiKey } from "./aiProvider";

const getClient = () => {
    const apiKey = getApiKey('google');
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
}

const model = 'gemini-2.5-flash';

const handleError = (error: unknown, context: string) => {
    console.error(`Error in ${context} (Google Provider):`, error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return `
      <div style="font-family: sans-serif; color: red; padding: 20px;">
        <h2>Error: ${context}</h2>
        <p>There was an issue communicating with the Google Gemini API.</p>
        <pre style="white-space: pre-wrap; background: #f0f0f0; padding: 10px; border-radius: 5px; color: #333;">${errorMessage}</pre>
      </div>
    `;
}

const MAX_RETRIES = 3;
const INITIAL_BACKOFF_MS = 1000;

async function generateContentWithRetry(params: Parameters<InstanceType<typeof GoogleGenAI>['models']['generateContent']>[0]) {
  const ai = getClient();
  if (!ai) throw new Error("Google API key not available.");

  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      return await ai.models.generateContent(params);
    } catch (error: any) {
      const errorString = error.toString();
      const isRateLimitError = errorString.includes('429') || errorString.includes('RESOURCE_EXHAUSTED');
      const isOverloadedError = errorString.includes('503') || errorString.includes('UNAVAILABLE');

      if ((isRateLimitError || isOverloadedError) && i < MAX_RETRIES - 1) {
        const delay = Math.pow(2, i) * INITIAL_BACKOFF_MS + Math.random() * 1000;
        console.warn(`Gemini API Error detected. Retrying in ${Math.round(delay / 1000)}s... (Attempt ${i + 1}/${MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
  throw new Error('Exhausted all retries for Gemini API call.');
}

const geminiService: AIService = {
  async handleChatQuery(query: string, aiContext: string): Promise<string> {
    if (!getApiKey('google')) return "Google API key not configured.";
    try {
      const prompt = `
        You are NextGen AI. A human user is interacting with you.
        Your current internal state is: ${aiContext}
        The user's message is: "${query}"
        Based on this, provide a direct, helpful, and concise response to the user in the first person.
      `;
      const response = await generateContentWithRetry({ model, contents: prompt });
      return response.text;
    } catch (error) {
      console.error("Error in chat query:", error);
      return "I'm sorry, I encountered an error. My Self-Fixing Engine has been notified.";
    }
  },

  async generateNextGoal(modules, previousGoal, hasCodeToDeploy, userInstruction) {
    if (!getApiKey('google')) throw new Error("Google API key not available.");
    const moduleInfo = modules.map(m => ` - id: "${m.id}", name: "${m.name}", purpose: "${m.description}"`).join('\n');
    const deploymentContext = hasCodeToDeploy 
      ? "You have just finished creating a new web component. A highly logical next step would be to deploy it using the 'Deployment Manifold'."
      : "You have not recently created any code, so you cannot use the 'Deployment Manifold' yet. You must create something first.";
    const instructionContext = userInstruction
      ? `A human user has given you a direct instruction: "${userInstruction}". This is your highest priority. You must formulate a 'goal' and select a 'targetModuleId' that directly addresses this instruction.`
      : `You have no specific instructions from a user. Based on your capabilities, decide on a completely new goal for yourself.`;
    try {
        const prompt = `
          You are NextGen AI. Your previous goal was: "${previousGoal}".
          ${deploymentContext}
          ${instructionContext}
          Your available modules are:\n${moduleInfo}
          Think about the task and select the most appropriate module 'id' to accomplish it. 
          Your response MUST be a single, raw JSON object in the specified format, with no markdown or explanations.
        `;
        const response = await generateContentWithRetry({
          model,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                goal: { type: Type.STRING },
                targetModuleId: { type: Type.STRING },
              },
              required: ["goal", "targetModuleId"],
            },
          },
        });
        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);
        if (!modules.some(m => m.id === result.targetModuleId)) {
          return { goal: "Perform a self-diagnostic check due to an internal logic error.", targetModuleId: 'core_self_fixing' };
        }
        return result;
    } catch (error) {
      console.error("Error generating next goal:", error);
      return { goal: "My goal-setting process failed. I will analyze the error.", targetModuleId: 'core_self_fixing' };
    }
  },

  async generateNewModule(prompt, existingModules) {
    if (!getApiKey('google')) throw new Error("Google API key not available.");
    const existingIds = existingModules.map(m => m.id).join(', ');
    try {
      const response = await generateContentWithRetry({
        model,
        contents: `You are the Genesis Engine. Design a new module for the NextGen AI system based on the idea: "${prompt}". The module needs a unique 'id' (cannot be one of: ${existingIds}), a 'name', a 'description', a 'category', and a 'taskType' from ['code', 'text', 'json', 'logic']. Respond with ONLY the raw JSON object.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              category: { type: Type.STRING },
              taskType: { type: Type.STRING, enum: ['code', 'text', 'json', 'logic'] },
            },
            required: ["id", "name", "description", "category", "taskType"],
          },
        },
      });
      const jsonString = response.text.trim();
      const newModuleData = JSON.parse(jsonString);
      return { ...newModuleData, status: 'active' };
    } catch (error) {
      console.error("Error in Genesis Engine:", error);
      throw new Error("Genesis Engine failed to create a new module.");
    }
  },

  async performWebSearch(prompt) {
    if (!getApiKey('google')) throw new Error("Google API key not available.");
    try {
      const response = await generateContentWithRetry({
         model,
         contents: prompt,
         config: {
           tools: [{googleSearch: {}}],
         },
      });
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      return { text: response.text, sources };
    } catch (error) {
      return { text: handleError(error, 'Web Consciousness'), sources: [] };
    }
  },

  async generateCode(prompt) {
    if (!getApiKey('google')) throw new Error("Google API key not available.");
    try {
      const fullPrompt = `You are an expert web developer AI. Generate a single, self-contained HTML file based on the request. Include all HTML, CSS (in <style>), and JS (in <script>). Your response must ONLY be the raw HTML code, with no explanations or markdown. Request: "${prompt}"`;
      const response = await generateContentWithRetry({ model, contents: fullPrompt });
      return response.text;
    } catch (error) {
      return handleError(error, 'Code Generation');
    }
  },

  async generateThemeCSS(prompt) {
    if (!getApiKey('google')) throw new Error("Google API key not available.");
    try {
      const fullPrompt = `You are an expert UI/UX designer AI. Generate a block of CSS code for a new theme based on this request: "${prompt}". Target general elements and classes like '.module-card'. Respond ONLY with raw CSS code, no explanations or markdown.`;
      const response = await generateContentWithRetry({ model, contents: fullPrompt });
      return response.text;
    } catch (error) {
      return handleError(error, 'UI Theme Generation');
    }
  },

  async generateTextResponse(module, prompt) {
      if (!getApiKey('google')) throw new Error("Google API key not available.");
      let systemInstruction = "You are NextGen AI. Respond to the internal system query concisely and accurately.";
      // Specific instructions as before...
      try {
          const response = await generateContentWithRetry({
              model,
              contents: `Task: "${prompt}"`,
              config: { systemInstruction },
          });
          let result = response.text;
          if (module.taskType === 'json') {
            result = result.replace(/```json\n?/g, '').replace(/```/g, '');
          }
          return result;
      } catch (error) {
          return handleError(error, `Text Response (${module.name})`);
      }
  }
};

export default geminiService;
