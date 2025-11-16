// DiagramTabs.js

'use client'; 

import { useState, useCallback } from 'react'; // Added useCallback
import Grid from './Grid'; 
import Analysis from './Analysis';

// Start with an empty array.
const initialDiagrams = []; 

export default function DiagramTabs() {
    const [openTabs, setOpenTabs] = useState(initialDiagrams);
    const [activeTabId, setActiveTabId] = useState(initialDiagrams.length > 0 ? initialDiagrams[0].id : null);

    // Find the data for the currently active tab
    const activeTab = openTabs.find(tab => tab.id === activeTabId);
    const activeFlowchartData = activeTab ? activeTab.flowchartData : null;

    const handleTabClick = (id) => setActiveTabId(id);
    
    const handleCloseTab = (idToClose) => {
        setOpenTabs(prevTabs => {
            const newTabs = prevTabs.filter(tab => tab.id !== idToClose);
            
            if (idToClose === activeTabId && newTabs.length > 0) {
                const closedIndex = prevTabs.findIndex(tab => tab.id === idToClose);
                const newActiveTab = newTabs[Math.min(closedIndex, newTabs.length - 1)];
                setActiveTabId(newActiveTab.id);
            } else if (newTabs.length === 0) {
                setActiveTabId(null);
            }
            return newTabs;
        });
    };
        
    // Function to create a new tab
    const addDiagram = (label, nodes, edges) => {
        const newId = `d-${Date.now()}`; 
        const newLabel = label || `Untitled ${openTabs.length + 1}`;
        
        const newTab = {
            id: newId,
            label: newLabel,
            flowchartData: { nodes: nodes || [], edges: edges || [] }, 
        };

        setOpenTabs(prevTabs => [...prevTabs, newTab]);
        setActiveTabId(newId);
        
        return newId; 
    };

    // 🎯 NEW FUNCTION: Updates the nodes/edges for the currently active tab in state
    const updateFlowchartData = useCallback((nodes, edges) => {
        setOpenTabs(prevTabs => 
            prevTabs.map(tab => 
                tab.id === activeTabId
                    ? { ...tab, flowchartData: { nodes, edges } }
                    : tab
            )
        );
    }, [activeTabId]);

    // --- Render UI ---
    return (
        
        <div className="w-full h-full relative"> 
            
            {/* 1. TAB HEADER BAR */}
            {openTabs.length > 0 && ( 
                <div className="absolute top-0 left-0 flex bg-white w-fit z-10 rounded-br-3xl">
                    {openTabs.map(tab => (
                        <div
                            key={tab.id}
                            className={`flex items-center px-3 cursor-pointer transition-colors border-bottom border-right border-black ${
                                tab.id === activeTabId ? 'bg-green-100 border-b-1 border-r-1 border-black rounded-br-3xl pb-1' : 'text-gray-600 hover:bg-gray-200 border-b-1 border-r-1 rounded-br-3xl pb-1'
                            }`}
                            onClick={() => handleTabClick(tab.id)}
                        >
                            <span className="tab-label">{tab.label}</span>
                            <button
                                className="text-sm font-bold text-gray-400 hover:text-black pl-1 ml-1"
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    handleCloseTab(tab.id);
                                }}
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                    
                </div>
            )}

            <div className={`rounded-b-3xl flex-grow bg-white w-full h-full ${openTabs.length === 0 ? 'h-full' : 'overflow-auto'}`}>
                {openTabs.length === 0 ? (
                    <Analysis onAnalysisComplete={addDiagram} /> 
                ) : activeFlowchartData ? (
                    <Grid 
                        key={activeTabId} 
                        data={activeFlowchartData} 
                        onDataChange={updateFlowchartData}
                        onAddDiagram={addDiagram}
                    /> 
                ) : (
                    <p>Select a diagram tab to view or click '+' to open a new one.</p>
                )}
            </div>
        </div>
    );
}