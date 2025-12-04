"use client"

import { Background, Controls, ReactFlow, addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import Argument from "app/components/ui/diagram/nodes/Argument";
import { useChat } from "context/ChatContext";
import { useCallback, useState } from "react";
import Premise from "../../../ui/diagram/nodes/Premise";
import CounterArgument from "app/components/ui/diagram/nodes/CounterArgument";

const Grid = ({
    data,
    onDataChange,
    onAnalyzeNode
}) => {
    const { setReactFlowInstance } = useChat();

    const [nodes, setNodes] = useState(data.nodes);
    const [edges, setEdges] = useState(data.edges);

    const getLatestEdges = useCallback(() => edges, [edges]);
    const getLatestNodes = useCallback(() => nodes, [nodes]);

    const nodeTypes = {
        premise: Premise,
        counterargument: CounterArgument,
        argument: Argument
    };

    // 2.: Wrap onDataChange in queueMicrotask to defer the external state update.
    const onNodesChange = useCallback(
        (changes) => {
            setNodes((nodesSnapshot) => {
                const newNodes = applyNodeChanges(changes, nodesSnapshot);

                // This ensures setOpenTabs() is called AFTER React finishes rendering Grid.
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

                queueMicrotask(() => {
                    onDataChange(getLatestNodes(), newEdges);
                });

                return newEdges;
            });
        },
        [getLatestNodes, onDataChange],
    );

    const onNodeDoubleClick = useCallback((event, node) => {
        event.preventDefault();
        onAnalyzeNode(node);

    }, [onAnalyzeNode]);


    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={(instance) => setReactFlowInstance(instance)}
            onNodeDoubleClick={onNodeDoubleClick}
            fitView
        >
            <Background />
            <Controls showInteractive={true} />

        </ReactFlow>
    );
};

export default Grid;