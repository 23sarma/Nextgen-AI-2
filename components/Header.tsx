import React from 'react';
import { CpuChipIcon } from './icons';
import { ProviderSelector } from './ProviderSelector';
import type { AIProvider } from '../types';
import type { ProviderDetails } from '../services/aiProvider';

interface HeaderProps {
  isLoading: boolean;
  availableProviders: ProviderDetails[];
  currentProvider: AIProvider;
  onProviderChange: (provider: AIProvider) => void;
}

export const Header: React.FC<HeaderProps> = ({ isLoading, availableProviders, currentProvider, onProviderChange }) => {
  const statusText = isLoading ? 'System Status: Generating...' : 'System Status: Ready';
  const statusColor = isLoading ? 'text-yellow-400' : 'text-green-400';
  const pulseClass = isLoading ? 'animate-pulse' : '';

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center p-4 rounded-lg bg-black/20 backdrop-blur-sm border border-cyan-500/20 shadow-lg shadow-cyan-500/5">
      <div className="flex items-center gap-3">
        <CpuChipIcon className="w-8 h-8 text-cyan-400" />
        <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400">
          NextGen AI
        </h1>
      </div>
      <div className="flex items-center gap-4 mt-4 sm:mt-0">
        <ProviderSelector
          availableProviders={availableProviders}
          currentProvider={currentProvider}
          onProviderChange={onProviderChange}
        />
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isLoading ? 'bg-yellow-400' : 'bg-green-400'} ${pulseClass}`}></div>
          <p className={`text-sm font-medium ${statusColor} ${pulseClass}`}>
            {statusText}
          </p>
        </div>
      </div>
    </header>
  );
};