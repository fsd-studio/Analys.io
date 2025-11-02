const mockedEdges = [
    { "id": "e1", "source": "n0", "target": "n1" },
    { "id": "e2", "source": "n0", "target": "n2" },
    { "id": "e3", "source": "n1", "target": "n7" },
    { "id": "e4", "source": "n7", "target": "n6" },
    { "id": "e5", "source": "n7", "target": "n5" },
    { "id": "e7", "source": "n0", "target": "n3" },
    { "id": "e8", "source": "n3", "target": "n4" },
    { "id": "e9", "source": "n2", "target": "n8" },
    { "id": "e10", "source": "n8", "target": "n9" },
    { "id": "e11", "source": "n2", "target": "n10" },
    { "id": "e12", "source": "n2", "target": "n11" },
    { "id": "e13", "source": "n9", "target": "n12" }
];

const mockedNodes = [
    {
    "id": "n0",
    "Mid": "m0",
    "type": "premise",
    "data": { "label": "Jesus's Resurrection: Historical Event vs. Supernatural Claim", "person": "primary" }
    },
    
    {
    "id": "n1",
    "type": "argument",
    "data": { "label": "Resurrection Proves Reliability (Trustworthiness)", "person": "primary" }
    },
    {
    "id": "n2",
    "type": "counterargument",
    "data": { "label": "Disbelief based on Philosophical Presupposition (Naturalism)", "person": "secondary" }
    },
    {
    "id": "n3",
    "type": "argument",
    "data": { "label": "Historical Evidence (Jewish Worship Change from Sabbath to Sunday)", "person": "primary" }
    },
    {
    "id": "n4",
    "type": "counterargument",
    "data": { "label": "It proves Christianity existed, not its supernatural claim's validity", "person": "secondary" }
    },
    {
    "id": "n5",
    "type": "argument",
    "data": { "label": "Ethical Teaching & Death/Resurrection as supporting evidence", "person": "primary" }
    },
    {
    "id": "n6",
    "type": "counterargument",
    "data": { "label": "Reliance on 'Process of Elimination' for belief in Christ", "person": "secondary" }
    },
    {
    "id": "n7",
    "type": "argument",
    "data": { "label": "Need to examine historical claims in other religions (e.g., Muhammad)", "person": "primary" }
    },
    {
    "id": "n8",
    "type": "counterargument",
    "data": { "label": "Rejection of Miracles/Supernatural as 'Irrational' or 'Fantastic'", "person": "secondary" }
    },
    {
    "id": "n9",
    "type": "argument",
    "data": { "label": "Critique of Naturalism as limiting 'honest history'", "person": "primary" }
    },
    {
    "id": "n10",
    "type": "counterargument",
    "data": { "label": "Belief is a 'Sociological Phenomenon' (Impact is separate from historical claim)", "person": "secondary" }
    },
    {
    "id": "n11",
    "type": "counterargument",
    "data": { "label": "Lack of 'feeling' God's love or spiritual experience (Personal Standard)", "person": "secondary" }
    },
    {
    "id": "n12",
    "type": "argument",
    "data": { "label": "Love as a Free Decision (Proves reality is 'bigger than' matter and energy)", "person": "primary" }
    }
]

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
            str +=  `${'--'.repeat(space)}${child.id}-${child.x} mode -> ${child.mod}, shift -> ${child.#shift}${this.#getTreeString(child, space + 2)}`
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
    current = node

    while (current){
        contours.push(current)
        current = current.children[0]
    }

    return contours
}

function getRightContours(node) {
    let contours = []
    current = node

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
        // if left side is bigger than right side
        const difference =  leftContours[i].x + rightNode.mod + rightNode.shift - (rightContours[i].x + leftNode.mod + leftNode.shift) -1
        console.log("diff", difference)


        if (difference < 0) {
            rightNode.shift += Math.abs(difference);
            console.log("rightnode", rightNode.shift)
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

    console.log("index of child", index, node.children)
    
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
            console.log(node.x, index)
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
        
        shift = node.shift / node.parent.children.indexOf(node)
        length = parentChildren.length - 1 
        
        for (let j = 1; j <= length; j++) {
            parentChildren[j].shift = shift * j
        }
        
        i++
    }
    
    return
}

function secondPass(node, modSum = 0) {
    node.x += modSum + node.shift;
    console.log(node.id, node.mod, modSum, node.x)

    node.children.forEach(child => {
        console.log(node.mod)
        secondPass(child, modSum + node.mod + node.shift);
    });
}

const root = new Tree("n0")


buildTree(root, listStructure)
preOrder(root, assignY)
postOrder(root, firstPass)
secondPass(root, 0)


const num = Number("n1".replace(/\D/g, ""));

console.log(num)

root.print()