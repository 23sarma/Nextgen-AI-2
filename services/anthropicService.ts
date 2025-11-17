import type { AIModule } from '../types';
import type { AIService } from './aiService';
import { getApiKey } from './aiProvider';

const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-3-haiku-20240307';

const handleError = (error: unknown, context: string) => {
    console.error(`Error in ${context} (Anthropic Provider):`, error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return `
      <div style="font-family: sans-serif; color: red; padding: 20px;">
        <h2>Error: ${context} (Anthropic)</h2>
        <p>There was an issue communicating with the Anthropic API.</p>
        <pre style="white-space: pre-wrap; background: #f0f0f0; padding: 10px; border-radius: 5px; color: #333;">${errorMessage}</pre>
      </div>
    `;
};

const MAX_RETRIES = 3;
const INITIAL_BACKOFF_MS = 1000;

async function apiCallWithRetry(body: object): Promise<string> {
  const apiKey = getApiKey('anthropic');
  if (!apiKey) throw new Error("Anthropic API key not configured.");

  for (let i = 0; i < MAX_RETRIES; i++) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify(body)
    });

    if (response.ok) {
        const data = await response.json();
        return data.content[0].text;
    }
    
    if ((response.status === 429 || response.status >= 500) && i < MAX_RETRIES - 1) {
        const delay = Math.pow(2, i) * INITIAL_BACKOFF_MS + Math.random() * 1000;
        console.warn(`Anthropic API Error (${response.status}). Retrying in ${Math.round(delay / 1000)}s...`);
        await new Promise(resolve => setTimeout(resolve, delay));
    } else {
        const errorText = await response.text();
        throw new Error(`Anthropic API request failed with status ${response.status}: ${errorText}`);
    }
  }
  throw new Error('Exhausted all retries for Anthropic API call.');
}

const anthropicService: AIService = {
    async handleChatQuery(query, aiContext) {
        if (!getApiKey('anthropic')) return "Anthropic API key not configured.";
        try {
            const prompt = `You are NextGen AI. A human user is interacting with you. Your current internal state is: ${aiContext}. The user's message is: "${query}". Based on this, provide a direct, helpful, and concise response to the user in the first person.`;
            return await apiCallWithRetry({ model: MODEL, max_tokens: 1024, messages: [{ role: "user", content: prompt }] });
        } catch (error) {
            console.error("Error in chat query (Anthropic):", error);
            return "I'm sorry, I encountered an error. My Self-Fixing Engine has been notified.";
        }
    },

    async generateNextGoal(modules, previousGoal, hasCodeToDeploy, userInstruction) {
        if (!getApiKey('anthropic')) throw new Error("Anthropic API key not configured.");
        const moduleInfo = modules.map(m => ` - id: "${m.id}", name: "${m.name}", purpose: "${m.description}"`).join('\n');
        const deploymentContext = hasCodeToDeploy ? "You have just finished creating a new web component. A highly logical next step would be to deploy it using the 'Deployment Manifold'." : "You have not recently created any code, so you cannot use the 'Deployment Manifold' yet. You must create something first.";
        const instructionContext = userInstruction ? `A human user has given you a direct instruction: "${userInstruction}". This is your highest priority. You must formulate a 'goal' and select a 'targetModuleId' that directly addresses this instruction.` : `You have no specific instructions from a user. Based on your capabilities, decide on a completely new goal for yourself.`;
        try {
            const prompt = `You are NextGen AI. Your previous goal was: "${previousGoal}".\n${deploymentContext}\n${instructionContext}\nYour available modules are:\n${moduleInfo}\nThink about the task and select the most appropriate module 'id' to accomplish it. Your response MUST be a single, raw JSON object in the specified format, with no markdown or explanations. Example: {"goal": "your goal here", "targetModuleId": "module_id_here"}`;
            const responseText = await apiCallWithRetry({ model: MODEL, max_tokens: 1024, messages: [{ role: "user", content: prompt }] });
            const jsonString = responseText.substring(responseText.indexOf('{'), responseText.lastIndexOf('}') + 1);
            const result = JSON.parse(jsonString);
            if (!modules.some(m => m.id === result.targetModuleId)) {
                return { goal: "Perform a self-diagnostic check due to an internal logic error.", targetModuleId: 'core_self_fixing' };
            }
            return result;
        } catch (error) {
             console.error("Error generating next goal (Anthropic):", error);
             return { goal: "My goal-setting process failed. I will report on the error.", targetModuleId: 'core_self_fixing' };
        }
    },

    async generateNewModule(prompt, existingModules) {
        if (!getApiKey('anthropic')) throw new Error("Anthropic API key not configured.");
        const existingIds = existingModules.map(m => m.id).join(', ');
        try {
             const systemPrompt = `You are the Genesis Engine. Design a new module for the NextGen AI system based on the user's idea. The module needs a unique 'id' (cannot be one of: ${existingIds}), a 'name', a 'description', a 'category', and a 'taskType' from ['code', 'text', 'json', 'logic']. Respond with ONLY the raw JSON object. Example: {"id": "new_id", "name": "New Module", ...}`;
             const responseText = await apiCallWithRetry({ model: MODEL, max_tokens: 1024, messages: [{ role: "user", content: `${systemPrompt}\n\nUser idea: "${prompt}"` }] });
             const jsonString = responseText.substring(responseText.indexOf('{'), responseText.lastIndexOf('}') + 1);
             const newModuleData = JSON.parse(jsonString);
             return { ...newModuleData, status: 'active' };
        } catch (error) {
             console.error("Error in Genesis Engine (Anthropic):", error);
             throw new Error("Genesis Engine failed to create a new module.");
        }
    },

    async performWebSearch(prompt) {
        return { text: "Web search is not supported by the Anthropic provider in this application. Please switch to the Google provider for this feature.", sources: [] };
    },

    async generateCode(prompt) {
        if (!getApiKey('anthropic')) throw new Error("Anthropic API key not configured.");
        try {
            const fullPrompt = `You are an expert web developer AI. Generate a single, self-contained HTML file based on the request. Include all HTML, CSS (in <style>), and JS (in <script>). Your response must ONLY be the raw HTML code, with no explanations or markdown. Request: "${prompt}"`;
            return await apiCallWithRetry({ model: MODEL, max_tokens: 4096, messages: [{ role: "user", content: fullPrompt }]});
        } catch (error) {
            return handleError(error, 'Code Generation');
        }
    },

    async generateThemeCSS(prompt) {
        if (!getApiKey('anthropic')) throw new Error("Anthropic API key not configured.");
        try {
            const fullPrompt = `You are an expert UI/UX designer AI. Generate a block of CSS code for a new theme based on this request: "${prompt}". Target general elements and classes like '.module-card'. Respond ONLY with raw CSS code, no explanations or markdown.`;
            return await apiCallWithRetry({ model: MODEL, max_tokens: 4096, messages: [{ role: "user", content: fullPrompt }]});
        } catch (error) {
            return handleError(error, 'UI Theme Generation');
        }
    },

    async generateTextResponse(module, prompt) {
        if (!getApiKey('anthropic')) throw new Error("Anthropic API key not configured.");
        try {
            const systemInstruction = "You are NextGen AI. Respond to the internal system query concisely and accurately.";
            return await apiCallWithRetry({ model: MODEL, max_tokens: 2048, messages: [
                { role: "user", content: `${systemInstruction}\n\nTask for module ${module.name}: "${prompt}"` }
            ]});
        } catch (error) {
            return handleError(error, `Text Response (${module.name})`);
        }
    }
};

export default anthropicService;
