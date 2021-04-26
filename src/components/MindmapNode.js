import Draggable from 'react-draggable';
import React, { useRef, useEffect, useState } from 'react'
import { symbolDiamond } from 'd3-shape';
import './MindmapNode.css';
// Temporary solution for generating ID
let id = 0
const getId = () => {
    id++
    return id
}

const MindmapNode = (props) => {

    const [node, setNode] = useState({
        node: props.node,
        nodeWidth: 300
    })
    const textRef = useRef(null);

    useEffect(() => {
        console.log("WIDTH:", textRef.current.offsetWidth);
        setNode({
            nodeWidth: textRef.current.offsetWidth
        });
        console.log(node.nodeWidth)
    }, []);

    function createNewNode(x, y) {
        const newNode = {
            id: getId(), // Temporary solution //// brukes foreløpig kun for å se forskjell på nodene i debugging.
            x: x,
            y: y,
            children: []
        }
        return newNode
    }

    const handlePlusBtnClick = () => {
        // Create copy of this node
        let thisNode = props.node
        // Create new node
        const newNode = createNewNode(props.node.x + 50, 0)
        // Add the new node to "children" in the copy of this node
        thisNode.children = [...thisNode.children, newNode]

        // Report this change to my parent. Use the copy of the node as parameter. (State will be set later when props arrive)
        props.reportToParent(thisNode, props.index)
    }

    // My children know this method as props.reportToParent.
    const updateChild = (updatedChild, index) => {
        // I'll just create a copy of myself, and replace the child that is updated.
        let thisNode = props.node
        thisNode.children[index] = updatedChild

        // I better report the change to my parent.
        props.reportToParent(thisNode, props.index)
        // Now I wait for the new props to arrive.
        // My parent will do the same procedure. It will report to its parent, and its parent will report to its parent, and so forth.
        // At one point, the Mindmap component is actually the parent!
        // That's when the big render starts, and we all get our new props that will define our new state and shape as a whole.
        // ... Not that my state will be any different from what I reported to my parent, though.
    }

    return (
        <>
            <Draggable /* position={{ x: props.node.x, y: props.node.y }} */ >
                <g>
                    <foreignObject 
                        className="mindmap-node" width={node.nodeWidth}
                        x={props.node.x + 20} y={props.node.y }
                        overflow="visible">
                        
                        <div className="node-wrapper">
                            <div className="new-node-buttonf" onClick={handlePlusBtnClick}>+</div>
                            <p className="text-content" ref={textRef} contentEditable="true">{props.node.id}</p>
                        </div>
                    </foreignObject>
                </g>
            </Draggable>

            {props.node.children.map((child, index) => (
                <MindmapNode node={child} className={child.id} reportToParent={updateChild.bind(this)} index={index} />
            ))}
        </>
    )
}

export default MindmapNode;