import React, { useState } from 'react';
import type { AIModule, TaskType, GroundingSource } from '../types';
import { CodeBracketSquareIcon, EyeIcon, RocketLaunchIcon } from './icons';

interface InteractivePaneProps {
  selectedModule: AIModule | undefined;
  currentPrompt: string;
  generatedCode: string;
  isLoading: boolean;
  taskType: TaskType;
  sources: GroundingSource[];
}

export const InteractivePane: React.FC<InteractivePaneProps> = ({ selectedModule, currentPrompt, generatedCode, isLoading, taskType, sources }) => {
  const isCodeTask = taskType === 'code';
  const isJsonTask = taskType === 'json';
  const isRebuildTask = taskType === 'system_rebuild';
  const isWebSearchTask = taskType === 'web_search';
  const isCreateModuleTask = taskType === 'create_module';
  const isDeployTask = taskType === 'deploy';

  const [view, setView] = useState<'preview' | 'code'>(isCodeTask ? 'preview' : 'code');
  
  React.useEffect(() => {
    // When task type changes, reset the view
    setView(isCodeTask ? 'preview' : 'code');
  }, [taskType, isCodeTask]);


  if (!selectedModule) {
    return (
      <div className="flex items-center justify-center h-full bg-black/30 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 shadow-lg shadow-cyan-500/5">
        <p className="text-gray-400">Awaiting system initialization...</p>
      </div>
    );
  }
  
  const renderSources = () => (
    <div className="p-4 border-t border-cyan-500/20">
      <h4 className="text-sm font-bold text-white mb-2">Sources from Web Consciousness:</h4>
      <ul className="text-xs space-y-1">
        {sources.map((source, index) => source.web && (
          <li key={index}>
            <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-200 underline truncate block">
              {source.web.title || source.web.uri}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  const isDeploySuccess = isDeployTask && generatedCode.startsWith('data:text/html');

  return (
    <div className="flex flex-col h-full bg-black/30 backdrop-blur-sm border border-cyan-500/20 rounded-lg shadow-lg shadow-cyan-500/5 overflow-hidden">
      <div className="p-4 border-b border-cyan-500/20 flex-shrink-0">
        <h2 className="text-xl font-bold text-white mb-2">{selectedModule.name}</h2>
        <p className="text-sm text-gray-400">Current Task: <span className="text-cyan-300">{currentPrompt || 'Initializing...'}</span></p>
      </div>

      <div className="flex-grow min-h-0 flex flex-col">
        {!isDeployTask && (
          <div className="flex-shrink-0 p-2 border-b border-cyan-500/20 flex items-center gap-2">
              {isCodeTask && (
                <button onClick={() => setView('preview')} className={`px-3 py-1 text-sm rounded-md flex items-center gap-1 ${view === 'preview' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400 hover:bg-gray-700'}`}><EyeIcon className="w-4 h-4" /> Preview</button>
              )}
              <button onClick={() => setView('code')} className={`px-3 py-1 text-sm rounded-md flex items-center gap-1 ${view === 'code' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400 hover:bg-gray-700'}`}><CodeBracketSquareIcon className="w-4 h-4"/> {isCodeTask ? 'Code' : isRebuildTask ? 'Generated CSS' : isCreateModuleTask ? 'Module Definition' : 'Raw Output'}</button>
          </div>
        )}
        
        <div className="flex-grow bg-black/20 overflow-auto relative">
            {isLoading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <div className="text-center">
                  <svg className="animate-spin h-8 w-8 text-cyan-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="mt-2 text-cyan-300 font-semibold">Generating...</p>
                </div>
              </div>
            )}

            {isDeployTask && !isLoading ? (
              <div className="p-6 text-center flex flex-col items-center justify-center h-full">
                {isDeploySuccess ? (
                  <>
                    <RocketLaunchIcon className="w-12 h-12 text-green-400 mb-4"/>
                    <h3 className="text-lg font-bold text-green-400">Deployment Successful!</h3>
                    <p className="text-sm text-gray-300 mt-2">The new tool has been launched and is accessible via the link below.</p>
                    <a
                      href={generatedCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block bg-cyan-500 text-white font-bold py-2 px-4 rounded hover:bg-cyan-600 transition-colors"
                    >
                      Open Launched Tool
                    </a>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-bold text-yellow-400">Deployment Blocked</h3>
                    <p className="text-sm text-gray-300 mt-2 font-mono p-4 bg-yellow-900/20 rounded-md">{generatedCode}</p>
                  </>
                )}
              </div>
            ) : isCodeTask && view === 'preview' ? (
                 <iframe
                    srcDoc={generatedCode}
                    title="Generated Component Preview"
                    className="w-full h-full border-0 bg-white"
                    sandbox="allow-scripts"
                />
            ) : (
                <pre className="p-4 text-sm whitespace-pre-wrap font-mono"><code className={isJsonTask ? 'text-green-300' : isRebuildTask ? 'text-blue-300' : 'text-yellow-200'}>{generatedCode}</code></pre>
            )}
        </div>
         {isWebSearchTask && sources.length > 0 && renderSources()}
      </div>
    </div>
  );
};
