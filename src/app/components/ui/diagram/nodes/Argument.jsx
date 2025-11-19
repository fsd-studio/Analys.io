"use client";

import { Handle, Position } from "@xyflow/react";
import { useChat } from "context/ChatContext";

function Argument({ 
        data,
        id
    }) {

    const { setActiveID, activeID } = useChat();


    const styles = {
        primary: "border-blue-700 bg-blue-100",
        secondary: "border-green-700 bg-green-100",
    }
    
    const titleStyles = {
        primary: "text-blue-900",
        secondary: "text-green-900",
    }

    return (
        <>
            <div onClick={() => setActiveID(id)} className={`${styles[data.person]} ${activeID === id ? "ring-2 ring-blue-500" : ""} w-60 p-3 text-center flex items-center justify-center border rounded-xl`}>
                <h2 className={`${titleStyles[data.person]} text-sm font-primary font-semibold`}>{data.label}</h2>
                <Handle type="source" position={Position.Bottom} />
                <Handle type="target" position={Position.Top} />
            </div>
        </>
    );
}

export default Argument;