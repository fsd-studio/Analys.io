"use client"

import { useChat } from "context/ChatContext";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

function Settings({

}) {
    const [open, setOpen] = useState(false);
    const { chatMessages, setChatMessages, setNodes, setEdges, setActiveID } = useChat();

    const toggleOpen = () => {
        setOpen(!open);
    };

    const handleDeleteConversation = () => {
        setChatMessages([]);
        setNodes([]);
        setEdges([]);
        setActiveID(null);
        setOpen(false);
    }

    return (
        <>
            <div className="absolute top-3 left-3 z-10">
                <div onClick={toggleOpen} className="cursor-pointer flex gap-1 border border-green-700 w-fit bg-green-100 items-center p-2 rounded-full">
                    <div className="w-1 h-1 bg-green-700 rounded-full"/>
                    <div className="w-1 h-1 bg-green-700 rounded-full"/>
                    <div className="w-1 h-1 bg-green-700 rounded-full"/>
                </div>

                <div>
                    {open && (
                        <div className="bg-green-50 border mt-2 border-green-800 w-fit rounded-2xl p-4 z-20">

                            {chatMessages.length !== 0 && 
                            <div className="gap-2 flex flex-col">
                                <div onClick={handleDeleteConversation} className="flex items-center gap-1 cursor-pointer border border-red-300 border-b bg-red-50 hover:bg-red-100 p-3 rounded-2xl ">
                                    <MdDeleteForever className="text-red-800 w-6 h-auto" />
                                    <p className="text-sm text-red-800">Delete conversation</p>
                                </div>

                                <div onClick={handleDeleteConversation} className="flex items-center gap-1 cursor-pointer border border-red-300 bg-red-50 hover:bg-red-100 p-3 rounded-2xl ">
                                    <MdDeleteForever className="text-red-800 w-6 h-auto" />
                                    <p className="text-sm text-red-800">Setting 2</p>
                                </div>

                                <div onClick={handleDeleteConversation} className="flex items-center gap-1 cursor-pointer border border-red-300 bg-red-50 hover:bg-red-100 p-3 rounded-2xl ">
                                    <MdDeleteForever className="text-red-800 w-6 h-auto" />
                                    <p className="text-sm text-red-800">Setting 3</p>
                                </div>
                            </div>
                            }

                            {chatMessages.length === 0 &&
                                <p className="text-sm text-gray-700">No settings available.</p>
                            }
                        </div>
                    )}
                </div>
            </div>

        </>
    );
}

export default Settings;