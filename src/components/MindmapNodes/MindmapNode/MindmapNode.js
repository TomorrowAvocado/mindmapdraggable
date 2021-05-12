import React, { useState } from 'react';

import DragWrapper from '../../../hoc/DragWrapper';
import MindmapEdge from '../MindmapEdge/MindmapEdge';
import NodeContent from './NodeContent/NodeContent';


import './MindmapNode.css';

// Temporary solution for generating ID
let id = 0
const getId = () => {
    id++
    return id
}

/**
 * Generates a svg foreignObject element containing html for node layout and data
 * Generates a edge to parent node
 * Adds a new node for each element in its children-array
 * @param {*} props 
 * @returns MindmapNode Component
 */

const MindmapNode = (props) => {


    const [state, setState] = useState({
        node: props.node,
    })


    // If node is selected, set style to visualize this to user.
    // Change color of border, and make adjust width button appear
    function setStyle() {

        let styles = "MindmapNode";

        if(state.node.id === props.selectedNodeId) {
            return styles += " NodeSelected";
        }
        else {
            return styles += " NodeNotSelected";
        }
    }


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
        console.log("CREATE NEW FROM: ", thisNode)
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
        <>



        <DragWrapper>

            {props.node.children.map((child, index) => (
                //generer bare barn
                //ved flytting manipulerer denne node sin forelder edge
                // og for hvert barn
                <MindmapNode 
                    key={index}
                    node={child} 
                    parent={state.node}
                    className={child.id}
                    reportToParent={updateChild.bind(this)}
                    handleSelected={props.handleSelected}
                    index={index}
                    selectedNodeId = {props.selectedNodeId} />
            ))}


            <MindmapEdge 
                x1={props.parent.x + props.parent.nodeWidth / 2} 
                y1={props.parent.y + props.parent.nodeHeight / 2} 
                x2={state.node.x + state.node.nodeWidth / 2} 
                y2={state.node.y + state.node.nodeHeight / 2}/>

            <foreignObject className="node-wrapper"
                x={state.node.x} y={state.node.y}
                width={props.node.nodeWidth}> {/* state.node.strokeWidth*2} */}

                <div onDragStartCapture = {() => console.log("HELLO")}
                    onMouseDownCapture={() => props.handleSelected(state.node.id)}
                    className={setStyle()}>

                    <button
                        className="new-node-button"
                        onClick={handlePlusBtnClick}>
                        +                        
                    </button>
                    <button draggable="true" onDrag={() => console.log("HO")}
                        className="adjust-width-button"
                        onClick={props.adjustWidth}>
                        &lt;&gt;
                    </button>

                    <NodeContent node={props.node} />

                </div>
                

            </foreignObject>
            {/* <DragWrapper>
            <circle cx={state.node.x + state.node.nodeWidth} cy={state.node.y}
                   r="10" stroke="black" fill="black" />
            </DragWrapper> */}
            
        </DragWrapper>
        </>
    )
}

export default MindmapNode;

/* 
<DragWrapper>

    {props.node.children.map((child, index) => (
        <MindmapNode />
    ))}

    <MindmapEdge />

    <foreignObject >
        <div>
            <button>
                +
            </button>
            <NodeContent />
        </div>
    </foreignObject>

</DragWrapper>
 */


