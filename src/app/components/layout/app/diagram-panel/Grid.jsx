
import { Background, Controls, MiniMap, Panel, ReactFlow, addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from "react";
import Premise from "../../../ui/diagram/nodes/Premise";
import Argument from "app/components/ui/diagram/nodes/Argument";

const Grid = ({
  title = "Free Will."
}) => {

  const nodeTypes = {
    premise: Premise,
    argument: Argument
  };
  
  const initialNodes = [
    {
      id: 'n1', // id needs to match that of the conversation
      position: { x: 0, y: 0 }, // don't worry about this value, I will compute it programmatically
      type: "premise", // what category the node falls under; for now the options should be: premise, argument, counterargument
      data: { label: "Free will does not exist.", person: "primary"}, // person being either primary or secondary. Essentially a boolean value
    },
    {
      id: 'n2',
      position: { x: 100, y: 400 },
      type: "argument",
      data: { label: "Everything we do is based on what we want, but we don't decide what we want.", person: "secondary"},
    },
  ]

  const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }]; // the program handles the edge connections like this. Each connection has an object: {} with id, source, and target.
  // you can either embed this data alongside initial nodes or have it separate; having it separate would be best as it would minimize programming requirements.

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

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

      {/* <Analysis></Analysis> */}
    </div>
  );
};

export default Grid;
