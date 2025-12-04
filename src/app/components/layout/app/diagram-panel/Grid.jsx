"use client";

import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useCallback, useEffect, useState } from "react";
import Premise from "../../../ui/diagram/nodes/Premise";
import Argument from "app/components/ui/diagram/nodes/Argument";

/**
 * Utility: ensure every node has a valid position
 * This prevents React Flow from crashing.
 */
const ensureNodePositions = (nodes) => {
  const X_SPACING = 250;
  const Y_SPACING = 150;

  return nodes.map((node, index) => ({
    ...node,
    position: node.position ?? {
      x: (index % 4) * X_SPACING,
      y: Math.floor(index / 4) * Y_SPACING,
    },
  }));
};

const Grid = ({
  data,
  onDataChange,
  onAnalyzeNode,
}) => {
  /**
   * ✅ Initialize with guaranteed positions
   */
  const [nodes, setNodes] = useState(() =>
    ensureNodePositions(data.nodes ?? [])
  );
  const [edges, setEdges] = useState(data.edges ?? []);

  /**
   * ✅ If parent sends new data (e.g. Gemini response),
   * normalize it again safely
   */
  useEffect(() => {
    setNodes(ensureNodePositions(data.nodes ?? []));
    setEdges(data.edges ?? []);
  }, [data.nodes, data.edges]);

  const getLatestEdges = useCallback(() => edges, [edges]);
  const getLatestNodes = useCallback(() => nodes, [nodes]);

  const nodeTypes = {
    premise: Premise,
    argument: Argument,
  };

  /**
   * Node change handler
   */
  const onNodesChange = useCallback(
    (changes) => {
      setNodes((nodesSnapshot) => {
        const newNodes = applyNodeChanges(changes, nodesSnapshot);

        queueMicrotask(() => {
          onDataChange(newNodes, getLatestEdges());
        });

        return newNodes;
      });
    },
    [getLatestEdges, onDataChange]
  );

  /**
   * Edge change handler
   */
  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((edgesSnapshot) => {
        const newEdges = applyEdgeChanges(changes, edgesSnapshot);

        queueMicrotask(() => {
          onDataChange(getLatestNodes(), newEdges);
        });

        return newEdges;
      });
    },
    [getLatestNodes, onDataChange]
  );

  /**
   * Manual connect handler
   */
  const onConnect = useCallback(
    (params) => {
      setEdges((edgesSnapshot) => {
        const newEdges = addEdge(params, edgesSnapshot);

        queueMicrotask(() => {
          onDataChange(getLatestNodes(), newEdges);
        });

        return newEdges;
      });
    },
    [getLatestNodes, onDataChange]
  );

  /**
   * Double click handler
   */
  const onNodeDoubleClick = useCallback(
    (event, node) => {
      event.preventDefault();
      onAnalyzeNode(node);
    },
    [onAnalyzeNode]
  );

  /**
   * ✅ Guard against undefined during async loads
   */
  if (!nodes || !edges) {
    return <div>Loading diagram…</div>;
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeDoubleClick={onNodeDoubleClick}
      fitView
    >
      <Background />
      <Controls showInteractive />
    </ReactFlow>
  );
};

export default Grid;