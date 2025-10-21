import ResizableWindow from "app/components/ui/conversation/ResizableWindow";
import { useChat } from "context/ChatContext";
import Settings from "./Settings";
import UploadZone from "./UploadZone";
import Message from "app/components/ui/conversation/Message";

function Conversation() {

  const { chatMessages } = useChat();

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
