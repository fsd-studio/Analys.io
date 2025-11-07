// Grid.jsx (Final Corrected Code)

"use client"

import { Background, Controls, MiniMap, Panel, ReactFlow, addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from "react"; 
import Premise from "../../../ui/diagram/nodes/Premise";
import Argument from "app/components/ui/diagram/nodes/Argument";

const Grid = ({
    data, 
    title = "Conversation Flowchart", 
    onDataChange,    
    onAddDiagram     
}) => {

    // 1. Initialize state. Since DiagramTabs passes a 'key', this state resets on tab switch.
    const [nodes, setNodes] = useState(data.nodes);
    const [edges, setEdges] = useState(data.edges);
    
    // Helper function to get the current edges state outside of a setter, 
    const getLatestEdges = useCallback(() => edges, [edges]);
    const getLatestNodes = useCallback(() => nodes, [nodes]);
    

    const nodeTypes = {
        premise: Premise,
        argument: Argument
    };
    
    // 2. 💥 CRITICAL FIX: Wrap onDataChange in queueMicrotask to defer the external state update.
    const onNodesChange = useCallback(
        (changes) => {
            setNodes((nodesSnapshot) => {
                const newNodes = applyNodeChanges(changes, nodesSnapshot);
                
                // 🎯 DEFER THE EXTERNAL CALL: This ensures setOpenTabs() is called AFTER React finishes rendering Grid.
                queueMicrotask(() => {
                    onDataChange(newNodes, getLatestEdges());
                }); 
                
                return newNodes;
            });
        },
        [getLatestEdges, onDataChange], 
    );

    const onEdgesChange = useCallback(
        (changes) => {
            setEdges((edgesSnapshot) => {
                const newEdges = applyEdgeChanges(changes, edgesSnapshot);
                
                // 🎯 DEFER THE EXTERNAL CALL
                queueMicrotask(() => {
                    onDataChange(getLatestNodes(), newEdges);
                });
                
                return newEdges;
            });
        },
        [getLatestNodes, onDataChange], 
    );

    const onConnect = useCallback(
        (params) => {
            setEdges((edgesSnapshot) => {
                const newEdges = addEdge(params, edgesSnapshot);
                
                // 🎯 DEFER THE EXTERNAL CALL
                queueMicrotask(() => {
                    onDataChange(getLatestNodes(), newEdges);
                });

                return newEdges;
            });
        },
        [getLatestNodes, onDataChange], 
    );
    
    // Right-Click Handlers (No change needed)
    const onPaneContextMenu = useCallback((event) => {
        event.preventDefault();
        onAddDiagram(`New Empty Flowchart`, [], []); 
    }, [onAddDiagram]);

    const onNodeContextMenu = useCallback((event, node) => {
        event.preventDefault(); 
        const newLabel = `Context: ${node.data.label.substring(0, 20)}...`;
        const focusedNode = { ...node, position: { x: 0, y: 0 } };
        onAddDiagram(newLabel, [focusedNode], []);
    }, [onAddDiagram]);


    return (
        <ReactFlow 
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onPaneContextMenu={onPaneContextMenu} 
            onNodeContextMenu={onNodeContextMenu} 
            fitView
        >
            <Background />
            <Controls showInteractive={true} />
             
        </ReactFlow>
    );
};

export default Grid;