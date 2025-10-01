import { useChat } from "context/ChatContext";
import ResizableWindow from "../../ui/ResizableWindow";
import Message from "../Message";
import UploadZone from "../UploadZone";
import Settings from "./Settings";

function Conversation({ conversation }) {

  const { chatMessages, setChatMessages } = useChat();

  return (
      <ResizableWindow>
        
          <Settings></Settings>
          <div className="flex-grow scroll-auto !overflow-y-scroll h-0 gap-3 w-full flex flex-col relative">

              {chatMessages?.length > 0 ? (
              chatMessages.map((c, index) => (
                  <div key={index} className="w-full">
                    <Message primary={c.primary}>
                      {c.children}
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
