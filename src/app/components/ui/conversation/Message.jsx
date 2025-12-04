"use client"

import { useChat } from "context/ChatContext";

function Message({
  children = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  primary = true,
  id
}) {
  const { activeID, setActiveID, reactFlowInstance } = useChat();

  let nodes;
  let node;

  if (reactFlowInstance.getNodes) {
    nodes = reactFlowInstance.getNodes()
    node = nodes.filter((node) => node["MessageID"] == id)
    node = node[0]
  }

  async function handleClick(id) {
    if (typeof node !== "undefined") {
      console.log("node", node)
      reactFlowInstance.setCenter(node.position.x, node.position.y, { zoom: 0.75 })
      setActiveID(node.id)
    } else {
      setActiveID(id)
    }
  }

  return (
    <>
      <div onClick={() => handleClick(id)} className={`p-3 ${primary ? "bg-green-100 text-green-800 border-green-200 ms-auto" : "me-auto bg-sky-100 text-sky-800 border-sky-200"} ${(activeID === node?.id || activeID === id) ? "ring-2 ring-blue-500" : ""} h-fit border rounded-2xl w-fit max-w-[80%]`}>
        {children}
      </div>
    </>
  );
}

export default Message;