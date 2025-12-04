"use client";

import { Handle, Position } from "@xyflow/react";
import Wrapper from "./Wrapper";

function Argument({ 
        data,
        id
    }) {

    return (
        <>
            <Wrapper titleStyling="text-sm font-primary" id={id} title={data.label} data={data} styling={`w-60 p-3 text-center !text-sm flex items-center justify-center border rounded-xl`}>
                <Handle type="source" position={Position.Bottom} />
                <Handle type="target" position={Position.Top} />
            </Wrapper>
        </>
    );
}

export default Argument;