import React from 'react';

const Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    {props.children}
  </svg>
);

export const DeepseekIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props} viewBox="0 0 24 24" >
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
    </Icon>
);


export const OpenAiIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props} strokeWidth={1} >
        <path d="M18.396 6.115a8.995 8.995 0 01-12.792 0M5.604 17.885a8.995 8.995 0 0112.792 0M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zM12 5.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"/>
    </Icon>
);

export const AnthropicIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props} fill="currentColor">
        <path d="M12.721.846a1.29 1.29 0 00-1.442 0L.987 9.121a1.29 1.29 0 00.721 2.373h4.088v8.66a1.29 1.29 0 001.29 1.29h9.826a1.29 1.29 0 001.29-1.29v-8.66h4.088a1.29 1.29 0 00.72-2.373L12.721.846zm-2.83 18.068V12.78h4.218v6.134H9.89z" />
    </Icon>
);

export const KeyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props} >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
    </Icon>
);

export const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props} >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </Icon>
);


export const UserCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></Icon>
);

export const ChatBubbleOvalLeftEllipsisIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.753 9.753 0 01-4.571-1.158l-2.097.879a.75.75 0 01-.986-.986l.879-2.097A9.753 9.753 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></Icon>
);

export const PaperAirplaneIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></Icon>
);


export const CodeBracketSquareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
  </Icon>
);

export const CircleStackIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
  </Icon>
);

export const ComputerDesktopIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
  </Icon>
);

export const ShieldCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
  </Icon>
);

// Fix: Added missing ShieldExclamationIcon component.
export const ShieldExclamationIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
    </Icon>
);

export const WrenchScrewdriverIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.472-2.472a3.375 3.375 0 00-4.773-4.773L6.75 10.5M11.42 15.17L6.75 10.5m4.67 4.67l-2.472-2.472a3.375 3.375 0 00-4.773-4.773L6.75 10.5" />
  </Icon>
);

export const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 01-1.423-1.423L13.25 18.5l1.188-.648a2.25 2.25 0 011.423-1.423L16.25 15.5l.648 1.188a2.25 2.25 0 011.423 1.423l.938.648-1.188.648a2.25 2.25 0 01-1.423 1.423z" />
  </Icon>
);

export const CpuChipIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M15.75 3v1.5m0 16.5v-1.5m3.75-12h1.5m-18 0h1.5M12 4.5V3m0 18v-1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6.75 6.75 0 100-13.5 6.75 6.75 0 000 13.5z" />
    </Icon>
);

export const CubeTransparentIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9.75l-9-5.25m9 5.25l9-5.25" />
    </Icon>
);

export const ServerStackIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 21H5.25a2.25 2.25 0 01-2.25-2.25V15M21 3.75V18a2.25 2.25 0 01-2.25 2.25H6.75m0 0v-1.5m0 1.5a2.25 2.25 0 002.25 2.25h13.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H3.75m16.5 0v11.25m0 0h-1.5m1.5 0a2.25 2.25 0 01-2.25 2.25h-13.5a2.25 2.25 0 01-2.25-2.25m16.5 0V6.75" /></Icon>
);

export const FolderIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5m-16.5 0a2.25 2.25 0 01-2.25-2.25V6.75c0-1.242 1.008-2.25 2.25-2.25h3.75c.621 0 1.192.258 1.591.691L8.25 6.75h12A2.25 2.25 0 0122.5 9v8.25a2.25 2.25 0 01-2.25-2.25H5.25a2.25 2.25 0 01-2.25-2.25V9.75z" /></Icon>
);

export const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></Icon>
);

export const Cog8ToothIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h3m-3 12h3m-10.5-6h18M6 6l-1.5 1.5M18 6l1.5 1.5m-15 9l1.5-1.5M19.5 16.5l-1.5-1.5M10.5 18v3m3-3v3m-3-18v3m3-3v3" /></Icon>
);

export const BrainIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" /><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 6a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zM12.75 12a.75.75 0 00.75-.75v-.042a.75.75 0 00-.75-.75h-.042a.75.75 0 00-.75.75v.042c0 .414.336.75.75.75h.042z" /></Icon>
);

export const CalculatorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm3-6h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm3-6h.008v.008H14.25v-.008zm0 3h.008v.008H14.25v-.008zM4.5 3.75v16.5h15V3.75h-15z" /></Icon>
);

export const BeakerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 5.25a5.236 5.236 0 01-4.25 5.204M14.25 5.25a5.236 5.236 0 00-4.25 5.204M14.25 5.25v13.5M19.5 12.75l-2.625 2.625M12 12.75l-2.625 2.625M12 12.75v6.75M17.25 10.5h-10.5a.75.75 0 00-.75.75v6a.75.75 0 00.75.75h10.5a.75.75 0 00.75-.75v-6a.75.75 0 00-.75-.75z" /></Icon>
);

export const CommandLineIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m3 0h3m-3 2.25l3 2.25-3 2.25M16.5 7.5h3m-3 4.5h3m-3 4.5h3M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25h-15a2.25 2.25 0 00-2.25 2.25v10.5a2.25 2.25 0 002.25 2.25z" /></Icon>
);

export const ChatBubbleLeftRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72 3.72a.75.75 0 01-1.06 0l-3.72-3.72C9.347 17.1 8.5 16.136 8.5 15v-4.286c0-.97.616-1.813 1.5-2.097m6.5 0a9.022 9.022 0 00-5.443-2.342 9.022 9.022 0 00-5.443 2.342" /></Icon>
);

export const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></Icon>
);

export const MicrophoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m12-3a6 6 0 00-6-6 6 6 0 00-6 6v4.5A6 6 0 0012 15a6 6 0 006-6v-4.5z" /></Icon>
);

export const MusicalNoteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.002 1.949l-3.356 1.88-1.581-2.807A2.25 2.25 0 009 15.562a2.25 2.25 0 00-1.581 2.807l-1.58 2.807L.498 19.502A2.25 2.25 0 010 17.553V13.8a2.25 2.25 0 011.002-1.949l3.356-1.881L6 14.25V9z" /></Icon>
);

export const FilmIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></Icon>
);

export const CubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5v5.529a2.25 2.25 0 01-1.126 1.95l-6.388 3.69a2.25 2.25 0 01-2.25 0l-6.388-3.69A2.25 2.25 0 013 13.03V7.5M3 7.5L12 2.25l9 5.25M3 7.5v5.529A2.25 2.25 0 004.126 15L12 19.75l7.874-4.75A2.25 2.25 0 0021 13.029V7.5" /></Icon>
);

export const ArrowsPointingOutIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75v4.5m0-4.5h-4.5m4.5 0L15 9m5.25 11.25v-4.5m0 4.5h-4.5m4.5 0L15 15" /></Icon>
);

export const PaintBrushIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a15.998 15.998 0 001.622-3.385m0 0a15.998 15.998 0 00-3.388-1.621m-5.043-.025a15.998 15.998 0 01-1.622-3.385m0 0a15.998 15.998 0 013.388-1.621m5.043.025a15.998 15.998 0 00-1.622-3.385" /></Icon>
);

export const PlusCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></Icon>
);

export const GlobeAltIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.953 11.953 0 0112 13.5c-2.998 0-5.74-1.1-7.843-2.918" /></Icon>
);

export const RocketLaunchIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82l-.01-.01-.01-.01a6 6 0 017.38-5.84l-1.52 1.52z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.34 2.58l4.95 4.95-1.52 1.52a6 6 0 01-5.84-7.38l.01.01.01.01 4.82 4.82z" />
    </Icon>
);