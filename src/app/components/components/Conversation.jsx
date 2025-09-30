import Message from "./Message";

function Conversation({
    conversation,
}) {
  return (
    <>
        <div className="flex-grow overflow-y-auto min-h-0 gap-3 flex flex-col">
            {/* Messages */}
            {conversation ? conversation.map((c, index) => (
                <div key={index}>

                    <Message primary={c.primary}></Message>
                </div>
            )) : <div>Get started!</div>}
        </div>
    </>
  );
}

export default Conversation;