
import React, { Component, useEffect, createRef, ReactDOM, useRef, useState } from 'react'
import Draggable from 'react-draggable';
import NodeText from './NodeText/NodeText';
import './MindmapNode.css';

const MindmapNode = (props) => {

    const [dim, setDim] = useState({
        x: props.node.x,
        y: props.node.y
    })

    let styles = "MindmapNode";

    if(props.node.isSelected) {
        styles = styles + " NodeIsSelected";
    }

    useEffect(() => {
        console.log('RENDER!');
      }, []);

    return (

        <Draggable
            cancel=".focusedText" /* Cancels drag on className="focusedText" */
            onDrag={props.onDrag}
            onStart={props.onDragStart}
            onStop={props.onDragStop}>

            <foreignObject 
                x={dim.x} y={dim.y} /* x={props.node.x} y={props.node.y} */
                width={props.node.nodeWidth + props.node.strokeWidth*2}  
                height={props.node.nodeHeight + props.node.strokeWidth*2}>
                
                <div 
                    onClick={props.handleSelected}
                    className={styles}>

                    <button
                        className="createNodeBtn"
                        onClick={props.plusBtnClicked}>+</button>

                    <NodeText node={props.node} />

                </div>
            </foreignObject>
        </Draggable>
    )
}

export default MindmapNode;