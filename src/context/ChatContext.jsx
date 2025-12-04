"use client";

import { createContext, useContext, useState } from "react";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState([]);
  const [edges, setEdges] = useState([]);
  const [activeID, setActiveID] = useState(null);

  return (
    <ChatContext.Provider value={{ reactFlowInstance, setReactFlowInstance, chatMessages, setChatMessages, activeID, setActiveID, nodes, setNodes, edges, setEdges }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
