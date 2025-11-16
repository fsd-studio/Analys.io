"use client"

import { useChat } from "context/ChatContext";
import { useEffect, useState } from "react";
import Button from "../../../ui/basic/Button";
import Tooltip from "../../../ui/basic/Tooltip";
import { generateNodes } from "app/actions/generateNodes";

function Analysis({
    onAnalysisComplete
}) {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const { chatMessages } = useChat(); 

    const handleAnalyze = async () => {
        setLoading(true);

        console.log("first check", chatMessages)
        
        const response = await generateNodes(chatMessages)

        const mockedEdges = response.initialEdges

        const mockedNodes = response.initialNodes

        class Tree {
        #children = new Map();
        #parent = null;
        #id = null;
        #x = 0;
        #y = 0;
        #mod = 0;
        #shift = 0;

        constructor(id) {
            this.#id = id
        }

        set y(y) {
            this.#y = y
        }

        get y() {
            return this.#y
        }

        get x() {
            return this.#x
        }

        set x(x) {
            this.#x = x
        }

        get shift() {
            return this.#shift
        }

        set shift(shift) {
            this.#shift = shift
        }

        set mod(mod) {
            this.#mod = mod
        }

        get mod() {
            return this.#mod
        }

        get id() {
            return this.#id
        }

        get children() {
            return Array.from(this.#children.values())
        }

        get parent() {
            return this.#parent
        }

        set parent(newParent) {
            this.#parent = newParent;
        }

        get childrenCount() {
            return this.#children.size
        }

        createChildNode(id) {
            const newNode = new Tree(id)
            newNode.parent = this
            this.#children.set(newNode.id, newNode)

            return newNode;
        }

        #getTreeString = (node, space = 0) => {
            let str = "\n";

            node.children.forEach((child) => {
                str +=  `${'--'.repeat(space)}${child.id}-${child.x} mode -> ${child.mod}, shift -> ${child.#shift}${this.#getTreeString(child, space + 2)}`
            })

            return str;
        }

        print() {
            console.log(`\n${this.id} mode -> ${this.mod}, ${this.#getTreeString(this, 2)} `)
        }
        }

        const listStructure = {}

        mockedEdges.forEach(element => {
            if(!listStructure[element.source]) {
                listStructure[element.source] = []
            } 

            listStructure[element.source].push(element.target)
        });

        function buildTree(node, listStructure) {
            const children = listStructure[node.id] || []
            
            children.forEach(child => {
                const childNode = node.createChildNode(child)
                buildTree(childNode, listStructure)
            });
        }

        function getLeftContours(node) {
            let contours = []
            let current = node

            while (current){
                contours.push(current)
                current = current.children[0]
            }

            return contours
        }

        function getRightContours(node) {
            let contours = []
            let current = node

            while (current){
                contours.push(current)
                current = current.children[current.children.length -1]
            }

            return contours
        }

        function calcShift(leftNode, rightNode) {
            const rightContours = getRightContours(leftNode)
            const leftContours = getLeftContours(rightNode)
            
            const minLength = Math.min(rightContours.length, leftContours.length)

            for (let i = 0; i < minLength; i++) {
                const difference =  leftContours[i].x + rightNode.mod + rightNode.shift - (rightContours[i].x + leftNode.mod + leftNode.shift) -1


                if (difference < 0) {
                    rightNode.shift += Math.abs(difference);
                }
            }
        }

        function postOrder(node, callBack) {
            node.children.forEach(child => {
                postOrder(child, callBack)
            });

            callBack(node);
        }

        function preOrder(node, callBack) {
            callBack(node);

            node.children.forEach(child => {
                preOrder(child, callBack)
            });

        }

        function assignY(node) {
            if (!node.parent) {
                node.y = 0
            } else {
                node.y = node.parent.y + 1
            }
        }

        function firstPass(node) {
            const parentChildren = node.parent ? Array.from(node.parent.children) : [];
            const index = parentChildren.indexOf(node)

            // If node is first child of parent
            if (parentChildren[0] === node) {
                
                // If node has no children
                if (node?.children.length === 0) {
                    node.x = 0;
                } else {
                    node.x = (node.children[0].x + node.children[node.children.length -1].x) / 2
                }
                
                // If node is not the first child of parent
                parentChildren.slice(1).forEach((element, index) => {
                    element.x = node.x + index + 1
                });
                
                return
            } 
            
            // If node has children but is not the first child of the parent
            if (node?.children.length > 0 && node.parent != null) {
                node.mod = Math.abs(node.x - (node.children[0].x + node.children[node.children.length -1].x) / 2) 
            } 

            let i = 0
            while (i < index) {
                calcShift(parentChildren[i], node)
                
                const shift = node.shift / node.parent.children.indexOf(node)
                const length = parentChildren.length - 1 
                
                for (let j = 1; j <= length; j++) {
                    parentChildren[j].shift = shift * j
                }
                
                i++
            }
            
            return
        }

        function secondPass(node, modSum = 0) {
            
            node.x += modSum + node.shift;
            
            mockedNodes[Number(node.id.replace(/\D/g, ""))].position = { x: node.x * 300, y: node.y * 200 }
            
            node.children.forEach(child => {
                secondPass(child, modSum + node.mod + node.shift);
            });
        }
        
        const root = new Tree("n0")
        
        buildTree(root, listStructure)
        preOrder(root, assignY)
        postOrder(root, firstPass)
        secondPass(root, 0)
        
        root.x = (root.children[0].x + root.children[root.children.length -1].x) / 2

        mockedNodes[0].position = { x: root.x * 300, y: 0 }

        onAnalysisComplete("Conversation Flowchart", mockedNodes, mockedEdges);

        setLoading(false);
    }

    useEffect(() => {
        // Reset analysis state when chat messages change
        setResponse(null);
        setLoading(false);
        setError(null)
    }, [chatMessages]);


    return (
        <>
            {response && (
                <div className="mt-4 p-4 border border-gray-300 rounded-b-lg">
                    <h3 className="font-primary text-xl">AI Analysis Result</h3>
                    <pre className="whitespace-pre-wrap">{JSON.stringify(response.text, null, 2)}</pre>
                </div>
            )}

            {!response && (
            <div className="flex flex-col gap-2 items-center justify-center h-full">
                <h2 className="font-primary uppercase text-2xl">Analyze Conversation</h2>
                <p className="mb-3 w-90 text-center text-sm text-gray-700">Our sophisticated AI will interpret and analyze your conversation, and provide you with a summary.</p>

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