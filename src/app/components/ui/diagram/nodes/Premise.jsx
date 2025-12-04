import { Handle, Position } from "@xyflow/react";
import Wrapper from "./Wrapper";

function Premise({ 
        data, 
        id
    }) {

    return (
        <Wrapper titleStyling="p-2 font-primary uppercase font-bold" title={data.label} data={data} styling={`w-60 p-3 text-center flex items-center justify-center border-2 rounded-full`} id={id}>
            <Handle type="source" position={Position.Bottom} />
            <Handle type="target" position={Position.Top} />
        </Wrapper>
    );
}

export default Premise;