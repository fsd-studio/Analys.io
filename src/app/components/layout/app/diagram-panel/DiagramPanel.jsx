"use client"

import '@xyflow/react/dist/style.css';
import DiagramTabs from './DiagramTabs';

import { ReactFlowProvider } from '@xyflow/react'; 

const DiagramPanel = () => {
    return (
        <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
            <ReactFlowProvider> 
                <DiagramTabs /> 
            </ReactFlowProvider>
        </div>
    );
};

export default DiagramPanel;