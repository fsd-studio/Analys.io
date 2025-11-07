// DiagramPanel.js

"use client"

import '@xyflow/react/dist/style.css';
import DiagramTabs from './DiagramTabs';

// 1. ✅ Import the necessary provider
import { ReactFlowProvider } from '@xyflow/react'; 

const DiagramPanel = () => {
    return (
        <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
            {/* 2. 🧱 Wrap DiagramTabs (and thus Grid) in the provider */}
            <ReactFlowProvider> 
                <DiagramTabs /> 
            </ReactFlowProvider>
        </div>
    );
};

export default DiagramPanel;