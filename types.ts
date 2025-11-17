import React from 'react';

export type ModuleStatus = 'active' | 'inactive';
export type TaskType = 'code' | 'text' | 'json' | 'logic' | 'self_reflection' | 'system_rebuild' | 'create_module' | 'web_search' | 'deploy';
export type AIProvider = 'google' | 'openai' | 'anthropic' | 'deepseek';

export interface AIModule {
  id: string;
  name: string;
  category: string;
  description: string;
  status: ModuleStatus;
  icon: React.ReactNode;
  taskType: TaskType;
}

export interface GroundingSource {
  web?: {
    uri: string;
    title: string;
  }
}