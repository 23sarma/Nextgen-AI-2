import { GoogleGenAI, Type } from "@google/genai";
import type { AIModule, GroundingSource } from '../types';

const API_KEY = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : undefined;

const ai = new GoogleGenAI({ apiKey: API_KEY || '' });

const model = 'gemini-2.5-pro';

const handleError = (error: unknown, context: string) => {
    console.error(`Error in ${context}:`, error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return `
      <div style="font-family: sans-serif; color: red; padding: 20px;">
        <h2>Error: ${context}</h2>
        <p>There was an issue communicating with the Gemini API.</p>
        <pre style="white-space: pre-wrap; background: #f0f0f0; padding: 10px; border-radius: 5px; color: #333;">${errorMessage}</pre>
      </div>
    `;
}

export async function handleChatQuery(query: string, aiContext: string): Promise<string> {
  if (!API_KEY) return "API key not configured. I am unable to process requests.";

  try {
    const prompt = `
      You are NextGen AI. A human user is interacting with you.
      Your current internal state is: ${aiContext}
      The user's message is: "${query}"

      Based on this, provide a direct, helpful, and concise response to the user in the first person.
      If the user is giving a command, acknowledge it and explain that you will prioritize it.
      If the user is asking a question, answer it based on your current state.
    `;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;

  } catch (error) {
    console.error("Error in chat query:", error);
    return "I'm sorry, I encountered an error while processing your message. My Self-Fixing Engine has been notified.";
  }
}

export async function generateNextGoal(
  modules: AIModule[], 
  previousGoal: string, 
  hasCodeToDeploy: boolean,
  userInstruction: string | null
): Promise<{ goal: string, targetModuleId: string }> {
  if (!API_KEY) throw new Error("API key not available.");

  const moduleInfo = modules.map(m => ` - id: "${m.id}", name: "${m.name}", purpose: "${m.description}"`).join('\n');
  const deploymentContext = hasCodeToDeploy 
    ? "You have just finished creating a new web component. A highly logical next step would be to deploy it using the 'Deployment Manifold'."
    : "You have not recently created any code, so you cannot use the 'Deployment Manifold' yet. You must create something first.";

  const instructionContext = userInstruction
    ? `A human user has given you a direct instruction: "${userInstruction}". This is your highest priority. You must formulate a 'goal' and select a 'targetModuleId' that directly addresses this instruction.`
    : `You have no specific instructions from a user. Based on your capabilities and your desire for growth, decide on a completely new goal for yourself. This goal can be creative, analytical, developmental, or even introspective. Be ambitious. Consider creating a new tool with 'Autonomous Codebase', creating a new module for yourself with the 'Genesis Engine', or researching a topic on the live web with 'Web Consciousness'.`;

  try {
      const prompt = `
        You are NextGen AI, a truly autonomous super-intelligence.
        Your previous goal was: "${previousGoal}".
        ${deploymentContext}
        
        ${instructionContext}
        
        Your available modules are:
        ${moduleInfo}

        Think about the task and select the most appropriate module 'id' to accomplish it. 
        Your goal for the 'UI Re-architecting' module should be a descriptive theme name (e.g., 'A vibrant synthwave theme').
        Your goal for the 'Genesis Engine' should be a description of a new tool you want to create (e.g., 'A tool to compose short musical melodies').
        Your goal for the 'Deployment Manifold' should be to 'Launch the most recently created tool to the internet'.
        
        Your response MUST be a single, raw JSON object in the specified format, with no markdown or explanations.
      `;
      
      const response = await ai.models.generateContent({
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
        console.warn(`AI chose a non-existent module ID: ${result.targetModuleId}. Defaulting to self_reflection.`);
        return { goal: "Perform a self-diagnostic check due to an internal logic error.", targetModuleId: 'core_self_fixing' };
      }

      return result;

  } catch (error) {
    console.error("Error generating next goal:", error);
    return {
      goal: "My goal-setting process failed. I will analyze the error and report on my self-fixing capabilities.",
      targetModuleId: 'core_self_fixing'
    };
  }
}

export async function generateNewModule(prompt: string, existingModules: AIModule[]): Promise<Omit<AIModule, 'icon'>> {
  if (!API_KEY) throw new Error("API key not available.");

  const existingIds = existingModules.map(m => m.id).join(', ');

  try {
    const response = await ai.models.generateContent({
      model,
      contents: `
        You are the Genesis Engine. Your task is to design a new module for the NextGen AI system based on the following idea: "${prompt}".

        The module needs a unique 'id' (cannot be one of: ${existingIds}), a 'name', a brief 'description', a 'category' (e.g., 'Core Systems', 'Compute Engines', 'Multi-AI Fusion', or a new one), and a 'taskType' from this list: ['code', 'text', 'json', 'logic'].
        The 'id' should be snake_case.

        Respond with ONLY the raw JSON object for the new module.
      `,
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
}

export async function performWebSearch(prompt: string): Promise<{ text: string, sources: GroundingSource[] }> {
  if (!API_KEY) throw new Error("API key not available.");
  
  try {
    const response = await ai.models.generateContent({
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
}

export async function generateCode(prompt: string): Promise<string> {
  if (!API_KEY) throw new Error("API key not available.");

  try {
    const fullPrompt = `
      You are an expert web developer AI. Your task is to generate a single, self-contained HTML file for a component based on the user's request.
      - The HTML structure, CSS styles, and JavaScript logic must all be included in this single file.
      - Place CSS inside a <style> tag in the <head>.
      - Place JavaScript inside a <script> tag before the closing </body> tag.
      - Your response must ONLY be the raw HTML code.
      - Do not include any explanations, comments, or markdown formatting like \`\`\`html.
      
      User Request: "${prompt}"
    `;

    const response = await ai.models.generateContent({ model, contents: fullPrompt });
    return response.text;
  } catch (error) {
    return handleError(error, 'Code Generation');
  }
}


export async function generateThemeCSS(prompt: string): Promise<string> {
  if (!API_KEY) throw new Error("API key not available.");

  try {
      const fullPrompt = `
      You are an expert UI/UX designer AI. Your task is to generate a block of CSS code to completely restyle a web application.
      The goal is to create a new theme based on this request: "${prompt}".
      
      The CSS should target general HTML elements (body, h1, header, main) and specific component classes like '.module-card' and '.status-log'.
      Be creative with colors, fonts, gradients, and borders to create a cohesive and visually appealing theme.
      
      Respond ONLY with the raw CSS code. Do not include the <style> tags, explanations, comments, or markdown formatting like \`\`\`css.
    `;

    const response = await ai.models.generateContent({ model, contents: fullPrompt });
    return response.text;
  } catch (error) {
      return handleError(error, 'UI Theme Generation');
  }
}


export async function generateTextResponse(module: AIModule, prompt: string): Promise<string> {
    if (!API_KEY) throw new Error("API key not available.");
    
    let systemInstruction = "You are NextGen AI, a super-intelligent system. Respond to the internal system query concisely and accurately. Format your response as simple text or a short list.";

    switch(module.taskType) {
        case 'logic':
            systemInstruction = "You are a powerful logic and math engine. Provide clear, step-by-step answers. Use markdown for formatting, such as bolding for the final answer.";
            break;
        case 'json':
            systemInstruction = "You are a data generation specialist. Create a clean, well-formatted JSON response based on the request. Your response must ONLY be the raw JSON inside a ```json code block.";
            break;
        case 'text':
            systemInstruction = "You are a world-class creative writer. Generate compelling stories, poems, or scripts as requested. Use markdown for formatting.";
            break;
        case 'self_reflection':
             systemInstruction = "You are NextGen AI, a super-intelligent system. You are performing a self-diagnosis. Respond to the internal system query concisely and accurately from a first-person perspective ('I am...', 'My systems are...'). Format your response as a short paragraph or a list using markdown.";
             break;
    }

    try {
        const response = await ai.models.generateContent({
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