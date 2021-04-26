import React, { useRef, useEffect, useState } from 'react';

import MindmapEdge from '../MindmapEdge/MindmapEdge';
import NodeContent from './NodeContent/NodeContent';
import makeDraggable from '../../../hoc/makeDraggable';
import './MindmapNode.css';
// Temporary solution for generating ID
let id = 0
const getId = () => {
    id++
    return id
}

const MindmapNode = React.forwardRef((props, ref) => {

    const [state, setState] = useState({
        node: props.node,
    })

    let styles = "MindmapNode";
    if(state.node.id === props.selectedNodeId) {
        styles += " NodeSelected";
    }
    else {
        styles += " NodeNotSelected";
    }
    const nodeRef = useRef(null);

    useEffect(() => {
        if(nodeRef.current) {
            makeDraggable(nodeRef.current)
        }
        console.log("THIS NODE", state.node)
        console.log("Node x: ", props.node.x)
        console.log("Node width: ", props.node.nodeWidth)
    }, [nodeRef.current]);

    function createNewNode(parentNode) {
        const newNode = {
            id: getId(), // Temporary solution //// brukes foreløpig kun for å se forskjell på nodene i debugging.
            x: parentNode.x + 100,
            y: parentNode.y - 100,
            nodeWidth: parentNode.nodeWidth,
            nodeHeight: parentNode.nodeHeight,
            children: []
        }
        return newNode
    }

    const handlePlusBtnClick = () => {
        // Create copy of this node
        let thisNode = state.node
        // Create new node
        const newNode = createNewNode(thisNode)
        // Add the new node to "children" in the copy of this node
        thisNode.children = [...thisNode.children, newNode]

        setState({
            node: thisNode
        })
        // Report this change to my parent. Use the copy of the node as parameter. (State will be set later when props arrive)
        props.reportToParent(thisNode, props.index)
    }

    // My children know this method as props.reportToParent.
    const updateChild = (updatedChild, index) => {
        // I'll just create a copy of myself, and replace the child that is updated.
        let thisNode = state.node
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
        
        <g ref={nodeRef}>
            {props.node.children.map((child, index) => (
                //generer bare barn
                //ved flytting manipulerer denne node sin forelder edge
                // og for hvert barn
                <MindmapNode 
                    ref = {ref}
                    key={index}
                    node={child} 
                    parentX={state.node.x}
                    parentY={state.node.y}
                    parentWidth={props.node.nodeWidth}
                    parentHeight={props.node.nodeHeight}
                    className={child.id}
                    reportToParent={updateChild.bind(this)}
                    handleSelected={props.handleSelected}
                    index={index}
                    selectedNodeId = {props.selectedNodeId} />
            ))}

            <MindmapEdge 
                x1={props.parentX + props.parentWidth / 2} 
                y1={props.parentY + props.parentHeight / 2} 
                x2={state.node.x + state.node.nodeWidth / 2} 
                y2={state.node.y + state.node.nodeHeight / 2}/>

            <foreignObject className="node-wrapper"
                x={state.node.x} y={state.node.y}
                width="200"//{state.node.nodeWidth + state.node.strokeWidth*2}  
                //{state.node.nodeHeight + state.node.strokeWidth*2}
                >

                <div 
                    onClick={() => props.handleSelected(state.node.id)}
                    className={styles}
                    >

                    <button
                        className="new-node-button"
                        onClick={handlePlusBtnClick}>+</button>
                    
                    <button
                        className="adjust-width-button"
                        onClick={console.log("DRAG TO ALTER WIDTH")}>&lt;&gt;</button>

                    <NodeContent node={props.node} />

                </div>
            </foreignObject>
        </g>
    )
})

export default MindmapNode;

{/* 
    
    



    
    <>
            <Draggable /* position={{ x: props.node.x, y: props.node.y }}  >
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
        </> */}