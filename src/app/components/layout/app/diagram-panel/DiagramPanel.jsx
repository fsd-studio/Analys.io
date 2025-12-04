"use client"

import '@xyflow/react/dist/style.css';
import DiagramTabs from './DiagramTabs';

const DiagramPanel = () => {
    return (
        <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
            <DiagramTabs /> 
        </div>
    );
};

export default DiagramPanel;