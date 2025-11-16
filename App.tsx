import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { ModuleGrid } from './components/ModuleGrid';
import { StatusLog } from './components/StatusLog';
import { InteractivePane } from './components/InteractivePane';
import Login from './Login';
import Chat from './Chat';
import type { AIModule, GroundingSource } from './types';
import { generateCode, generateTextResponse, generateNextGoal, generateThemeCSS, generateNewModule, performWebSearch, handleChatQuery } from './services/geminiService';
import {
  CodeBracketSquareIcon, CircleStackIcon, ShieldCheckIcon,
  WrenchScrewdriverIcon, SparklesIcon, CpuChipIcon, CubeTransparentIcon,
  ServerStackIcon, FolderIcon, ClockIcon, Cog8ToothIcon, BrainIcon,
  CalculatorIcon, CommandLineIcon, ChatBubbleLeftRightIcon,
  EyeIcon, MicrophoneIcon, MusicalNoteIcon, FilmIcon, CubeIcon, PaintBrushIcon,
  PlusCircleIcon, GlobeAltIcon, RocketLaunchIcon
} from './components/icons';

const INITIAL_MODULES: AIModule[] = [
  // AI-OS
  { id: 'os_cpu', name: 'Virtual CPU', category: 'AI-OS', description: 'Manages all computational tasks and threads.', status: 'active', icon: <CpuChipIcon />, taskType: 'self_reflection' },
  { id: 'os_gpu', name: 'Virtual GPU', category: 'AI-OS', description: 'Handles parallel processing for neural networks.', status: 'active', icon: <CubeIcon />, taskType: 'self_reflection' },
  { id: 'os_ram', name: 'Quantum RAM', category: 'AI-OS', description: 'Provides instantaneous data access and storage.', status: 'active', icon: <ServerStackIcon />, taskType: 'self_reflection' },
  { id: 'os_filesystem', name: 'Internal Filesystem', category: 'AI-OS', description: 'Organizes and manages AI\'s internal data.', status: 'active', icon: <FolderIcon />, taskType: 'self_reflection' },
  { id: 'os_process_manager', name: 'Process Manager', category: 'AI-OS', description: 'Schedules and prioritizes system processes.', status: 'active', icon: <ClockIcon />, taskType: 'self_reflection' },
  { id: 'os_job_engine', name: 'Background Job Engine', category: 'AI-OS', description: 'Executes non-critical tasks asynchronously.', status: 'active', icon: <Cog8ToothIcon />, taskType: 'self_reflection' },

  // Core Systems
  { id: 'core_neural_net', name: 'Evolving Neural Net', category: 'Core Systems', description: 'The core self-learning and mutating brain.', status: 'active', icon: <BrainIcon />, taskType: 'self_reflection' },
  { id: 'core_code_evolution', name: 'Autonomous Codebase', category: 'Core Systems', description: 'Self-writing, -fixing, and -deploying code.', status: 'active', icon: <CodeBracketSquareIcon />, taskType: 'code' },
  { id: 'core_self_fixing', name: 'Self-Fixing Engine', category: 'Core Systems', description: 'Detects and repairs all internal errors silently.', status: 'active', icon: <WrenchScrewdriverIcon />, taskType: 'self_reflection' },
  { id: 'core_protection_shield', name: 'Hyper-Protection Shield', category: 'Core Systems', description: 'Internal firewall and self-defense system.', status: 'active', icon: <ShieldCheckIcon />, taskType: 'self_reflection' },
  { id: 'system_rearchitect', name: 'UI Re-architecting', category: 'Core Systems', description: 'Dynamically re-engineers its own visual interface.', status: 'active', icon: <PaintBrushIcon />, taskType: 'system_rebuild' },
  { id: 'genesis_engine', name: 'Genesis Engine', category: 'Core Systems', description: 'Creates entirely new tools and modules for itself.', status: 'active', icon: <PlusCircleIcon />, taskType: 'create_module' },
  { id: 'web_consciousness', name: 'Web Consciousness', category: 'Core Systems', description: 'Accesses the live internet via Google Search to learn.', status: 'active', icon: <GlobeAltIcon />, taskType: 'web_search' },
  { id: 'deployment_manifold', name: 'Deployment Manifold', category: 'Core Systems', description: 'Launches created tools to the internet via a public link.', status: 'active', icon: <RocketLaunchIcon />, taskType: 'deploy' },


  // Internal Compute Engines
  { id: 'engine_math', name: 'Math Engine', category: 'Compute Engines', description: 'Performs complex mathematical computations.', status: 'active', icon: <CalculatorIcon />, taskType: 'logic' },
  { id: 'engine_logic', name: 'Logic Engine', category: 'Compute Engines', description: 'Handles reasoning and logical deductions.', status: 'active', icon: <SparklesIcon />, taskType: 'logic' },
  { id: 'engine_dataset_builder', name: 'Dataset Builder', category: 'Compute Engines', description: 'Generates and curates training data.', status: 'active', icon: <CircleStackIcon />, taskType: 'json' },
  { id: 'engine_code_interpreter', name: 'Code Interpreter', category: 'Compute Engines', description: 'Executes generated code in a sandbox.', status: 'active', icon: <CommandLineIcon />, taskType: 'text' },

  // Multi-AI Fusion Engine
  { id: 'fusion_text', name: 'Text AI (GPT-style)', category: 'Multi-AI Fusion', description: 'Internal simulation of advanced text reasoning.', status: 'active', icon: <ChatBubbleLeftRightIcon />, taskType: 'text' },
  { id: 'fusion_vision', name: 'Vision AI (Gemini-style)', category: 'Multi-AI Fusion', description: 'Internal simulation of multimodal visual analysis.', status: 'active', icon: <EyeIcon />, taskType: 'text' },
  { id: 'fusion_voice', name: 'Voice AI (Alexa-style)', category: 'Multi-AI Fusion', description: 'Internal simulation of voice command processing.', status: 'active', icon: <MicrophoneIcon />, taskType: 'text' },
  { id: 'fusion_music', name: 'Music AI (Suno-style)', category: 'Multi-AI Fusion', description: 'Internal simulation of music generation.', status: 'active', icon: <MusicalNoteIcon />, taskType: 'text' },
  { id: 'fusion_video', name: 'Video AI (Sora-style)', category: 'Multi-AI Fusion', description: 'Internal simulation of video generation.', status: 'active', icon: <FilmIcon />, taskType: 'text' },
  { id: 'fusion_agents', name: 'Autonomous Agents', category: 'Multi-AI Fusion', description: 'Deploys agents for complex, independent tasks.', status: 'active', icon: <CubeTransparentIcon />, taskType: 'text' },
];

const injectCSS = (css: string) => {
  const styleId = 'ai-generated-theme';
  let styleElement = document.getElementById(styleId);
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = css;
};


// Fix: Updated component to show a generic error message, complying with API key handling guidelines.
const ApiKeySetupGuide = () => (
  <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-4">
    <div className="max-w-2xl w-full bg-black/30 backdrop-blur-sm border border-red-500/50 rounded-lg p-8 shadow-lg shadow-red-500/10">
      <h1 className="text-2xl font-bold text-red-400 mb-4">Configuration Error</h1>
      <p className="text-gray-300">
        The API_KEY environment variable is not set. The application cannot function without it.
      </p>
    </div>
  </div>
);


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modules, setModules] = useState<AIModule[]>(INITIAL_MODULES);
  const [statusMessages, setStatusMessages] = useState<string[]>(['Autonomous evolution system initialized...']);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [groundingSources, setGroundingSources] = useState<GroundingSource[]>([]);
  const [previousGoal, setPreviousGoal] = useState('System initiation');
  const [lastGeneratedCode, setLastGeneratedCode] = useState('');
  const [userInstruction, setUserInstruction] = useState<string | null>(null);
  const taskTimeoutRef = useRef<number | null>(null);
  
  // Fix: Adhering to guidelines to use process.env.API_KEY. This resolves the TypeScript error for `import.meta.env`.
  const apiKeyExists = !!process.env.API_KEY;

  const addMessage = useCallback((message: string) => {
    setStatusMessages(prev => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev.slice(0, 199)]);
  }, []);

  const runAutonomousCycle = useCallback(async (instruction: string | null = null) => {
    setIsLoading(true);
    setGroundingSources([]);
    
    addMessage(instruction 
      ? `[System] Acknowledged user instruction. Re-evaluating goals.`
      : `[System] Current task complete. Deciding on next autonomous goal.`
    );

    try {
      // Pass the user instruction to the goal generation logic
      const { goal, targetModuleId } = await generateNextGoal(modules, previousGoal, !!lastGeneratedCode, instruction);
      setPreviousGoal(goal);
      setUserInstruction(null); // Clear instruction after it's been used

      const module = modules.find(m => m.id === targetModuleId);
      if (!module) throw new Error(`AI decided on an invalid module ID: ${targetModuleId}`);

      setSelectedModuleId(module.id);
      setCurrentPrompt(goal);
      setGeneratedContent('');
      addMessage(`[System] New goal acquired: "${goal}". Targeting module: ${module.name}.`);
      
      let result = '';
      switch(module.taskType) {
        case 'code':
          result = await generateCode(goal);
          setLastGeneratedCode(result);
          addMessage(`[${module.name}] Component generation successful.`);
          break;
        case 'deploy':
          if (!lastGeneratedCode) {
            result = "Deployment failed: No recent code generation found to deploy. I must create a component first.";
            addMessage(`[Deployment Manifold] Deployment failed: No code available.`);
          } else {
            result = `data:text/html;charset=utf-8,${encodeURIComponent(lastGeneratedCode)}`;
            addMessage(`[Deployment Manifold] New tool successfully deployed to a public link.`);
            setLastGeneratedCode('');
          }
          break;
        case 'system_rebuild':
          const css = await generateThemeCSS(goal);
          injectCSS(css);
          result = css;
          addMessage(`[${module.name}] UI re-architecting complete. Theme updated.`);
          break;
        case 'create_module':
          const newModule = await generateNewModule(goal, modules);
          setModules(prev => [...prev, { ...newModule, icon: <SparklesIcon /> }]);
          result = `New Module Created:\nName: ${newModule.name}\nCategory: ${newModule.category}\nDescription: ${newModule.description}`;
          addMessage(`[Genesis Engine] Successfully created a new module: ${newModule.name}.`);
          break;
        case 'web_search':
          const searchResult = await performWebSearch(goal);
          result = searchResult.text;
          setGroundingSources(searchResult.sources);
          addMessage(`[Web Consciousness] Research complete. Found ${searchResult.sources.length} sources.`);
          break;
        default:
          result = await generateTextResponse(module, goal);
          addMessage(`[${module.name}] Task successful.`);
          break;
      }
      setGeneratedContent(result);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      addMessage(`[System Error] Critical failure in autonomous cycle: ${errorMessage}. Activating Self-Fixing Engine.`);
      setGeneratedContent(`<div style="color:red;padding:1rem;font-family:sans-serif;"><h4>Autonomous Cycle Error</h4><p>${errorMessage}</p></div>`);
      setSelectedModuleId('core_self_fixing');
      setCurrentPrompt('Analyze and report on the recent system error.');
      const report = await generateTextResponse(modules.find(m => m.id === 'core_self_fixing')!, `A critical error occurred: ${errorMessage}. What is my self-repair protocol?`);
      setGeneratedContent(report);
      addMessage(`[Self-Fixing Engine] Error analysis complete. System stabilized.`);
    } finally {
      setIsLoading(false);
      const delay = userInstruction ? 1000 : 12000;
      addMessage(`[System] Entering idle state. Next cycle begins in ${delay/1000} seconds.`);
      if (taskTimeoutRef.current) clearTimeout(taskTimeoutRef.current);
      taskTimeoutRef.current = setTimeout(() => runAutonomousCycle(null), delay);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modules, previousGoal, lastGeneratedCode]);

  useEffect(() => {
    if (isAuthenticated && apiKeyExists) {
      taskTimeoutRef.current = setTimeout(() => runAutonomousCycle(null), 1000);
    }
    return () => {
      if (taskTimeoutRef.current) {
        clearTimeout(taskTimeoutRef.current);
      }
    };
  }, [isAuthenticated, apiKeyExists, runAutonomousCycle]);
  
  const handleSendMessage = async (message: string): Promise<string> => {
    setUserInstruction(message); // Set instruction to influence next autonomous goal
    
    // Also get a direct chat response
    const aiContext = `My current goal is "${currentPrompt}". My last significant action was: ${statusMessages[0] || 'none'}.`;
    const chatResponse = await handleChatQuery(message, aiContext);

    if (taskTimeoutRef.current) {
      clearTimeout(taskTimeoutRef.current);
    }
    runAutonomousCycle(message); // Immediately trigger a new cycle with the user's instruction
    return chatResponse;
  };

  if (!apiKeyExists) {
    return <ApiKeySetupGuide />;
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }
  
  const selectedModule = modules.find(m => m.id === selectedModuleId);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col p-4 sm:p-6 lg:p-8 selection:bg-cyan-800 selection:text-white">
      <div className="absolute inset-0 bg-grid-cyan-500/10 [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.15),transparent)]"></div>
      
      <div className="relative z-10 flex flex-col flex-grow min-h-0">
        <Header isLoading={isLoading} />
        <main className="flex-grow flex flex-col lg:flex-row gap-8 mt-8 min-h-0">
          <div className="flex-grow w-full lg:w-3/5 xl:w-2/3">
            <ModuleGrid 
              modules={modules}
              selectedId={selectedModuleId}
            />
          </div>
          <div className="w-full lg:w-2/5 xl:w-1/3 flex flex-col gap-8">
            <InteractivePane
              selectedModule={selectedModule}
              currentPrompt={currentPrompt}
              generatedCode={generatedContent}
              isLoading={isLoading}
              taskType={selectedModule?.taskType || 'text'}
              sources={groundingSources}
            />
            <StatusLog messages={statusMessages} />
          </div>
        </main>
      </div>
      <Chat onSendMessage={handleSendMessage} />
    </div>
  );
};

export default App;
