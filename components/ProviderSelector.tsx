import React, { useState, useRef, useEffect } from 'react';
import type { AIProvider } from '../types';
import type { ProviderDetails } from '../services/aiProvider';

interface ProviderSelectorProps {
  availableProviders: ProviderDetails[];
  currentProvider: AIProvider;
  onProviderChange: (provider: AIProvider) => void;
}

export const ProviderSelector: React.FC<ProviderSelectorProps> = ({ availableProviders, currentProvider, onProviderChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectedProviderDetails = availableProviders.find(p => p.id === currentProvider) || availableProviders[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  if (availableProviders.length <= 1) {
    if (!selectedProviderDetails) return null;
    return (
        <div className="flex items-center gap-2 text-sm text-gray-300 bg-gray-800/50 px-3 py-1.5 rounded-md">
            <selectedProviderDetails.icon className="w-5 h-5 text-cyan-400" />
            <span>{selectedProviderDetails.name}</span>
        </div>
    );
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-gray-200 bg-gray-800/50 px-3 py-1.5 rounded-md hover:bg-gray-700/70 transition-colors"
      >
        {selectedProviderDetails && <selectedProviderDetails.icon className="w-5 h-5 text-cyan-400" />}
        <span>{selectedProviderDetails?.name || 'Select Provider'}</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-cyan-500/20 rounded-md shadow-lg z-20 animate-fade-in">
          <ul className="py-1">
            {availableProviders.map(provider => (
              <li key={provider.id}>
                <button
                  onClick={() => {
                    onProviderChange(provider.id);
                    setIsOpen(false);
                  }}
                  className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-cyan-500/20"
                >
                  <provider.icon className="w-5 h-5" />
                  {provider.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
