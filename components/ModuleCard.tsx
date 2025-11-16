import React from 'react';
import type { AIModule } from '../types';

interface ModuleCardProps {
  module: AIModule;
  isSelected: boolean;
}

const statusConfig = {
  active: { color: 'border-green-500/40', text: 'text-green-400' },
  inactive: { color: 'border-gray-500/40', text: 'text-gray-400' },
};

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, isSelected }) => {
  const { name, description, status, icon } = module;
  const config = statusConfig[status];
  
  const selectionClasses = isSelected 
    ? 'border-cyan-400 shadow-cyan-500/30 scale-105' 
    : 'border-gray-500/20';

  return (
    <div 
      className={`module-card text-left flex flex-col justify-between bg-gray-900/50 backdrop-blur-lg border rounded-lg p-4 shadow-lg transition-all duration-300 h-full ${selectionClasses}`}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg text-white">{name}</h3>
          <div className="w-6 h-6 text-cyan-400">{icon}</div>
        </div>
        <p className="text-sm text-gray-400 mb-4">{description}</p>
      </div>
      
      <div>
        <div className="flex justify-between items-center">
          <span className={`text-xs font-semibold uppercase ${config.text}`}>
            Status: {status}
          </span>
        </div>
      </div>
    </div>
  );
};