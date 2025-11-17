import React, { useState } from 'react';
import { getAvailableProviders, setApiKey } from '../services/aiProvider';
import { KeyIcon, CheckCircleIcon } from './icons';

interface ApiKeyManagerProps {
    onKeysSaved: () => void;
}

const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ onKeysSaved }) => {
    const initialProviders = getAvailableProviders();
    const [keys, setKeys] = useState<{ [key: string]: string }>({
        google: '',
        openai: '',
        anthropic: ''
    });
    const [savedStatus, setSavedStatus] = useState<{ [key: string]: boolean }>({
       google: initialProviders.find(p=>p.id === 'google')?.isConfigured || false,
       openai: initialProviders.find(p=>p.id === 'openai')?.isConfigured || false,
       anthropic: initialProviders.find(p=>p.id === 'anthropic')?.isConfigured || false,
    });

    const handleInputChange = (provider: string, value: string) => {
        setKeys(prev => ({ ...prev, [provider]: value }));
    };

    const handleSave = () => {
        let oneKeyIsSet = false;
        const newSavedStatus = { ...savedStatus };

        initialProviders.forEach(provider => {
            const inputKey = keys[provider.id];
            if (inputKey) {
                setApiKey(provider.id, inputKey);
                newSavedStatus[provider.id] = true;
                oneKeyIsSet = true;
            }
        });

        if (oneKeyIsSet) {
             setSavedStatus(newSavedStatus);
             onKeysSaved();
        } else {
            // Check if any keys are already configured from previous sessions
            const anyConfigured = getAvailableProviders().some(p => p.isConfigured);
            if (anyConfigured) {
                onKeysSaved();
            } else {
                 alert("Please enter at least one API key to continue.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-black/30 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-8 shadow-2xl shadow-cyan-500/10 animate-fade-in">
                 <div className="text-center">
                    <KeyIcon className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-white">API Key Manager</h1>
                    <p className="text-gray-400 mt-1">
                        Enter your API keys below to activate the AI providers. Your keys are saved securely in your browser's local storage.
                    </p>
                </div>
                
                <div className="space-y-6 mt-8">
                    {initialProviders.map(provider => (
                        <div key={provider.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="flex items-center gap-3 w-full sm:w-1/4">
                                    <provider.icon className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                                    <h2 className="font-semibold text-lg text-white">{provider.name}</h2>
                                </div>
                                <div className="w-full sm:w-3/4 flex items-center gap-2">
                                    <input
                                        type="password"
                                        placeholder={`Enter your ${provider.name} API Key`}
                                        onChange={(e) => handleInputChange(provider.id, e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    />
                                    {savedStatus[provider.id] && (
                                        <div className="flex items-center text-green-400" title="API Key is configured">
                                            <CheckCircleIcon className="w-6 h-6" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                 <div className="mt-8 text-center">
                    <button
                        onClick={handleSave}
                        className="bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-cyan-600 transition-colors text-lg"
                    >
                        Save &amp; Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApiKeyManager;
