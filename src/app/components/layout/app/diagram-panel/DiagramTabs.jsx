'use client'; 

import { useState, useCallback } from 'react'; 
import Grid from './Grid'; 
import Analysis from './Analysis';

const initialDiagrams = []; 
const TAB_SHRINK_THRESHOLD = 4;

export default function DiagramTabs() {
    const [openTabs, setOpenTabs] = useState(initialDiagrams);
    const [activeTabId, setActiveTabId] = useState(initialDiagrams.length > 0 ? initialDiagrams[0].id : null);
    
    const activeTab = openTabs.find(tab => tab.id === activeTabId);
    
    const isAnalysisActive = activeTabId?.startsWith('analysis-');
    
    const activeFlowchartData = !isAnalysisActive ? activeTab?.flowchartData : null;
    const analyzedNodeData = isAnalysisActive ? activeTab?.nodeData : null;

    const handleTabClick = (id) => {
        setActiveTabId(id);
    };
    
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
        
    const addDiagram = (label, nodes, edges) => {
        if (label === 'Node Analysis') return; 

        const newId = `d-${Date.now()}`; 
        const newLabel = label || `Untitled ${openTabs.filter(t => t.id.startsWith('d-')).length + 1}`;
        
        const newTab = {
            id: newId,
            label: newLabel,
            flowchartData: { nodes: nodes || [], edges: edges || [] }, 
        };

        setOpenTabs(prevTabs => [...prevTabs, newTab]);
        setActiveTabId(newId);
        
        return newId; 
    };

    const updateFlowchartData = useCallback((nodes, edges) => {
        if (activeTabId?.startsWith('analysis-')) return; 

        setOpenTabs(prevTabs => 
            prevTabs.map(tab => 
                tab.id === activeTabId
                    ? { ...tab, flowchartData: { nodes, edges } }
                    : tab
            )
        );
    }, [activeTabId]);

    const handleAnalyzeNode = useCallback((node) => {
        const newId = `analysis-${Date.now()}`; 
        
        const analysisTab = {
            id: newId,
            label: `Anl.: ${node.data.label.substring(0, 15)}...`,
            nodeData: node, 
        };

        setOpenTabs(prevTabs => [...prevTabs, analysisTab]);
        setActiveTabId(newId);
    }, []);


    // --- Render UI ---
    return (
        
        <div className="w-full h-full relative"> 
            
            {/* 1. TAB HEADER BAR */}
            {openTabs.length > 0 && ( 
                <div 
                    // Add 'w-full' only when the tab count forces shrinking.
                    className={`
                        absolute top-0 left-0 flex bg-white z-10 
                        overflow-hidden whitespace-nowrap rounded-br-3xl
                        ${openTabs.length > TAB_SHRINK_THRESHOLD ? 'w-full' : ''}
                    `}
                >
                    {openTabs.map(tab => (
                        <div
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            className={`
                                flex items-center px-3 cursor-pointer transition-colors border-bottom border-right border-black 
                                flex-shrink min-w-[50px] max-w-[250px] overflow-hidden
                                ${
                                    tab.id === activeTabId 
                                        ? 'bg-green-100 border-b-1 border-r-1 border-l-1 rounded-bl-md rounded-br-3xl pb-1' 
                                        : 'text-gray-600 hover:bg-gray-200 border-b-1 border-r-1 border-l-1 rounded-bl-md rounded-br-3xl pb-1'
                                }
                            `}
                        >
                            <span className={`
                                truncate 
                                ${openTabs.length > 8 ? 'hidden sm:inline' : 'inline'}
                            `}>
                                {tab.label}
                            </span>
                            
                            <button
                                className={`
                                    text-sm font-bold text-gray-400 hover:text-black 
                                    ml-1 
                                    ${openTabs.length > 8 ? 'absolute right-0 top-0 bottom-0 flex items-center pr-1' : 'pl-1'}
                                `}
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
                ) 
                
                : isAnalysisActive && analyzedNodeData ? (
                    <div className="p-4 w-full h-full flex flex-col overflow-auto pt-10">
                        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Node Context: **{analyzedNodeData.data.label}**</h2>
                        
                        <div className="flex-grow">
                            <p className="text-gray-700">**ID:** {analyzedNodeData.id}</p>
                            <p className="text-gray-700 mt-2">**Type:** {analyzedNodeData.type}</p>
                            <p className="text-gray-700 mt-2">**Data Details:**</p>
                            <blockquote className="border-l-4 border-green-500 pl-3 italic mt-1 bg-green-50 p-2 rounded">
                                {analyzedNodeData.data.description || analyzedNodeData.data.content || "No detailed content available for this node."}
                            </blockquote>
                        </div>
                    </div>

                ) : activeFlowchartData ? (
                    <Grid 
                        key={activeTabId} 
                        data={activeFlowchartData} 
                        onDataChange={updateFlowchartData}
                        onAnalyzeNode={handleAnalyzeNode}
                    /> 
                ) : null} 
            </div>
        </div>
    );
}