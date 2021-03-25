import Draggable from 'react-draggable';
import React, { useState, useRef, useEffect } from 'react'
import * as d3 from 'd3'

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

const MindmapNode = (props) => {
    
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

            const node = d3.select(nodeRef.current);

            function dragstarted() {
                d3.select(this).raise();
                node.attr("cursor", "grabbing");
            }
        
            function dragged(event, d) {
                //d3.select(this).attr("x", d.x = event.x).attr("y", d.y = event.y);
            }
        
            function dragended() {
                node.attr("cursor", "grab");
            }
        
            function zoomed({transform}){
                node.attr("transform", transform);
            }

            node
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));

        }
    }, [nodeRef.current])

    return (
        <>
            {state.children.map((child, index) => (
                //generer bare barn
                //ved flytting manipulerer denne node sin forelder edge
                // og for hvert barn
                <MindmapNode 
                    key={index}
                    node={child} 
                    parentX={state.x}
                    parentY={state.y}
                    className={child.id}
                    addMeToMyParent={addChildToState.bind(this)}
                    index={index} />
            ))}

            <MindmapEdge 
                x1={props.parentX + 30} 
                y1={props.parentY + 30} 
                x2={state.x + 30} 
                y2={state.y + 50}/>

                <foreignObject 
                    /* x={dim.x} y={dim.y}  */
                    ref={nodeRef}
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
            
        </>
    )
}

export default MindmapNode;