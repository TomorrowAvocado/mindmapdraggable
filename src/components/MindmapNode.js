import React, { useState, useRef, useEffect } from 'react'
import * as d3 from 'd3';
import makeDraggable from './makeDraggable';

import NodeText from './NodeText';
import MindmapEdge from './MindmapEdge';
import './MindmapNode.css';

// testing start (Midlertidig løsning)
let id = 0
const getId = () => {
    id++
    return id
}
// testing slutt

// Note to self: 
// Når den lager ny node, blir ikke det første klikket registrert i state.
// Tror oppdateringen hos forfedrene henger ett klikk etter.

//
// Code begins here:
//

const MindmapNode = React.forwardRef((props, ref) => {
    
    const [state, setState] = useState({
        ...props.node
    })

    const createNewNode = (x, y) => {
        const newNode = {
            id: getId(),
            x: x,
            y: y,
            children: []
        }
        return newNode
    }

    const handlePlusBtnClick = () => {
        const newNode = createNewNode(this.state.x + 100, 0)
        // Add new node to children in state
        setState({
            children: [...this.state.children, newNode]
        })
        // Report change to parent
        props.addMeToMyParent(this.state, this.props.index)
    }

    const addChildToState = (node, index) => {
        let stateChildren = this.state.children
        // Update child in children
        stateChildren[index] = node
        setState({
            children: stateChildren
        })

        // Call the same method in parent node
        props.addMeToMyParent(this.state, this.props.index)
    }


    let styles = "MindmapNode";

    /* if(this.props.node.isSelected) {
        styles = styles + " NodeIsSelected";
    } */

    const nodeRef = useRef(null);

    useEffect(() => {
        if(nodeRef.current) {
            makeDraggable(nodeRef.current)
        }
    }, [nodeRef.current])

    return ( 
        <g ref={nodeRef}>
            {state.children.map((child, index) => (
                //generer bare barn
                //ved flytting manipulerer denne node sin forelder edge
                // og for hvert barn
                <MindmapNode 
                    ref = {ref}
                    key={index}
                    node={child} 
                    parentX={state.x}
                    parentY={state.y}
                    parentWidth={props.node.nodeWidth}
                    parentHeight={props.node.nodeHeight}
                    className={child.id}
                    addMeToMyParent={addChildToState.bind(this)}
                    index={index} />
            ))}

            <MindmapEdge 
                x1={props.parentX + props.parentWidth / 2} 
                y1={props.parentY + props.parentHeight / 2} 
                x2={state.x + state.nodeWidth / 2} 
                y2={state.y + state.nodeHeight / 2}/>
            <foreignObject className="nodeWrapper"
                /* x={dim.x} y={dim.y}  */
                
                x={state.x} y={state.y}
                width={props.node.nodeWidth + props.node.strokeWidth*2}  
                height={props.node.nodeHeight + props.node.strokeWidth*2}
                >

                <div 
                    onClick={props.handleSelected}
                    className={styles}
                    >

                    <button
                        className="createNodeBtn"
                        onClick={props.plusBtnClicked}>+</button>

                    <NodeText node={props.node} />

                </div>
            </foreignObject>
        </g>
    )
})

export default MindmapNode;