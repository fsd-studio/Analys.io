"use client"

import { Background, Controls, MiniMap, Panel, ReactFlow, addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from "react";
import Premise from "../../../ui/diagram/nodes/Premise";
import Argument from "app/components/ui/diagram/nodes/Argument";
import { useChat } from "context/ChatContext";

const Grid = ({
  title = "Free Will."
}) => {

  const { nodes, edges, setEdges, setNodes } = useChat();

  const nodeTypes = {
    premise: Premise,
    argument: Argument
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  return (
    <div className="p-3 w-full h-full flex flex-col gap-3 items-center justify-center">
      {
        
      }
      <ReactFlow 
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background></Background>
        <Controls showInteractive={true} />
        <Panel position="top-left">{title}</Panel>

      </ReactFlow>
    </div>
  );
};

export default Grid;
