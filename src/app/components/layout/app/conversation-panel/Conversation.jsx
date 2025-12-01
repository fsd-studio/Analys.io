"use client"

import Message from "app/components/ui/conversation/Message";
import ResizableWindow from "app/components/ui/conversation/ResizableWindow";
import { useChat } from "context/ChatContext";
import { useEffect, useRef } from "react";
import Settings from "./Settings";
import UploadZone from "./UploadZone";

function Conversation() {
  const targetRef = useRef({});
  const { chatMessages, activeID, setActiveID } = useChat();

  useEffect(() => {
    targetRef.current[activeID]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    console.log("Scrolling to message ID:", targetRef.current);
  }, [activeID]);

  return (
    <ResizableWindow>

      <Settings></Settings>
      <div className="flex-grow scroll-auto !overflow-y-scroll p-3 h-0 gap-3 w-full flex flex-col relative">

        {chatMessages?.length > 0 ? (
          chatMessages.map((c, index) => (
            <div ref={el => (targetRef.current[c.id] = el)} key={index} className="w-full">
              <Message id={c.id} primary={c.primary}>
                {c.content}
              </Message>
            </div>
          ))
        ) : (
          <UploadZone></UploadZone>
        )}
      </div>
    </ResizableWindow>
  );
}

export default Conversation;
