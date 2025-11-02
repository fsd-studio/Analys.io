"use client"

import '@xyflow/react/dist/style.css';
import Analysis from "./Analysis";
import Grid from './Grid';
import { useChat } from 'context/ChatContext';

const DiagramPanel = () => {
    const {nodes, edges} = useChat();

    return (
        <div className="p-3 w-full h-full flex flex-col gap-3 items-center justify-center">
            {
                nodes.length === 0 ? (
                    <Analysis></Analysis>
                ) : (
                    <Grid></Grid>
                )}
        </div>
    );
};

export default DiagramPanel;
