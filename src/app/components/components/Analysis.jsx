import { geminiAnalysis } from "app/api/ai/geminiAPI";
import { useChat } from "context/ChatContext";
import { useEffect, useState } from "react";
import { Button } from "..";
import Tooltip from "./Tooltip";

function Analysis({

}) {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const { chatMessages } = useChat();

    const handleAnalyze = async () => {
        setLoading(true);

        const contents = JSON.stringify(chatMessages);

        const APIresponse = await geminiAnalysis({ contents });

        console.log(APIresponse)

        if (APIresponse.error) {
            setLoading(false);
            setError(APIresponse.error);
            return;
        }

        setResponse(APIresponse);
        setLoading(false);
    }

    useEffect(() => {
        setResponse(null);
        setLoading(false);
        setError(null)


    }, [chatMessages]);


    return (
        <>
            {response && (
                <div className="mt-4 p-4 border border-gray-300 rounded">
                    <h3 className="font-primary text-xl">AI Analysis Result</h3>
                    <pre className="whitespace-pre-wrap">{JSON.stringify(response.text, null, 2)}</pre>
                </div>
            )}

            {!response && (
            <div className="flex flex-col gap-2 items-center justify-center h-full">
                <h2 className="font-primary uppercase text-2xl">Analyze Conversation</h2>
                <p className="mb-3 w-90 text-center text-sm text-gray-700">Our sophisticated AI will provide you interpret and analyze your conversation, and provide you with a summary.</p>

                <Tooltip message={loading ? "Analyzing..." : chatMessages.length === 0 ? "No messages to analyze" : "Analyze the current conversation"}>
                    <Button onClick={handleAnalyze} disabled={loading || chatMessages.length === 0} outline size="lg">Analyze</Button>
                </Tooltip>

                {error && <p className="text-red-600 text-xs w-40 text-center">{error}</p>}
            </div>
            )}
        </>
    );
}

export default Analysis;