import { Handle, Position } from "@xyflow/react";

function Premise({ 
        data
    }) {

    const styles = {
        primary: "border-blue-700 bg-blue-100",
        secondary: "border-green-700 bg-green-100",
        danger: "border-red-700 bg-red-100",
    }
    
    const titleStyles = {
        primary: "text-blue-800",
        neutral: "text-gray-800",
        success: "text-green-800",
        danger: "text-red-800",
    }

    return (
        <>
            <div className={`${styles[data.person]} w-60 p-3 text-center flex items-center justify-center border rounded-2xl`}>
                <h2 className={`${titleStyles[data.type]} text-xl font-primary uppercase font-bold`}>{data.label}</h2>
                <Handle type="source" position={Position.Bottom} />
                <Handle type="target" position={Position.Top} />
            </div>
        </>
    );
}

export default Premise;