import React from 'react';
import type { AIProvider } from "../types";
import type { AIService } from "./aiService";
import geminiService from "./geminiService";
import openAIService from "./openAIService";
import anthropicService from "./anthropicService";
import deepseekService from "./deepseekService";
import { CpuChipIcon, OpenAiIcon, AnthropicIcon, DeepseekIcon } from "../components/icons";

export interface ProviderDetails {
    id: AIProvider;
    name: string;
    apiKeyName: string; // This is now used as the localStorage key suffix
    isConfigured: boolean;
    icon: React.ComponentType<any>;
}

const PROVIDERS: Omit<ProviderDetails, 'isConfigured'>[] = [
    { id: 'google', name: 'Google Gemini', apiKeyName: 'API_KEY_GOOGLE', icon: CpuChipIcon },
    { id: 'openai', name: 'OpenAI GPT', apiKeyName: 'API_KEY_OPENAI', icon: OpenAiIcon },
    { id: 'anthropic', name: 'Anthropic Claude', apiKeyName: 'API_KEY_ANTHROPIC', icon: AnthropicIcon },
    { id: 'deepseek', name: 'Deepseek AI', apiKeyName: 'API_KEY_DEEPSEEK', icon: DeepseekIcon },
];

export function getApiKey(provider: AIProvider): string | null {
    const providerDetails = PROVIDERS.find(p => p.id === provider);
    if (!providerDetails) return null;
    return localStorage.getItem(providerDetails.apiKeyName);
}

export function setApiKey(provider: AIProvider, key: string): void {
    const providerDetails = PROVIDERS.find(p => p.id === provider);
    if (providerDetails) {
        if (key) {
            localStorage.setItem(providerDetails.apiKeyName, key);
        } else {
            localStorage.removeItem(providerDetails.apiKeyName);
        }
    }
}

export function getAvailableProviders(): ProviderDetails[] {
    return PROVIDERS.map(p => ({
        ...p,
        isConfigured: !!getApiKey(p.id),
    }));
}

export function getAiService(provider: AIProvider): AIService {
    switch (provider) {
        case 'google':
            return geminiService;
        case 'openai':
            return openAIService;
        case 'anthropic':
            return anthropicService;
        case 'deepseek':
            return deepseekService;
        default:
            console.warn(`Unknown or unconfigured AI provider: ${provider}. Defaulting to Google Gemini Service.`);
            return geminiService;
    }
}