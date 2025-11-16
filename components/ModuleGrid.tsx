import React from 'react';
import type { AIModule } from '../types';
import { ModuleCard } from './ModuleCard';

interface ModuleGridProps {
  modules: AIModule[];
  selectedId: string | null;
}

export const ModuleGrid: React.FC<ModuleGridProps> = ({ modules, selectedId }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 h-full overflow-y-auto pr-2">
      {modules.map(module => (
        <ModuleCard 
          key={module.id} 
          module={module} 
          isSelected={module.id === selectedId}
        />
      ))}
    </div>
  );
};