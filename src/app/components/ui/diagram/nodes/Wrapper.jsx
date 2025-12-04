import { useChat } from "context/ChatContext";

function Wrapper({children, id, styling, data, title, titleStyling}) {
    const { reactFlowInstance, setActiveID, activeID } = useChat()

    async function handleClick(id) {
        const node = reactFlowInstance.getNode(id)

        console.log(id, node)
        
        setActiveID(node.id)
    }

    const styles = {
        primary: "border-green-700 bg-green-100",
        secondary: "border-blue-700 bg-blue-100",
    }
    
    const titleStyles = {
        primary: "text-green-900",
        secondary: "text-blue-900",
    }

    return (
        <div className={`${id == activeID ? "ring-2 ring-blue-500" : ""} ${styles[data.person]} ${styling}`} onClick={() => handleClick(id)}>
            <h2 className={`${titleStyles[data.person]} ${titleStyling}`}>{title}</h2>
            {children}
        </div>
    );
}

export default Wrapper;