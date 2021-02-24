import { render } from '@testing-library/react';
import React, { Component, createRef, ReactDOM, useRef, useState } from 'react'
import Draggable from 'react-draggable';
import NodeText from './NodeText/NodeText';

import './MindmapNode.css';

const MindmapNode = (props) => {

    const [dim, setDim] = useState({
        x: props.node.posX,
        y: props.node.posY
    })
    console.log('dims', dim)
    
    let img = null;

    if(props.node.img) {
        img =  <img src={props.node.img}/>
    }

    let styles = "MindmapNode";

    if(props.node.isSelected) {
        styles = styles + " NodeIsSelected";
        console.log("sdfsd");
    }

    return (
        <Draggable 
            cancel=".focusedText" /* Cancels drag on className="focusedText" */
                    /* onDrag={props.onDrag} */
                    onStart={props.onDragStart}
                    onStop={props.onDragStop}
            /* onDrag={(e) => console.log(e.target.getBoundingClientRect())}  */
        >
            <foreignObject 
                x={dim.x} y={dim.y}
                /* x={props.node.x} y={props.node.y} */
                width={props.node.nodeWidth + props.node.strokeWidth*2}  
                height={props.node.nodeHeight + props.node.strokeWidth*2}
            >
                <div 
                    onClick={props.clicked}
                    className={styles}
                >
                    <button
                        className="createNodeBtn"
                        onClick={props.plusBtnClicked}>+</button>
                    <NodeText node={props.node} />
                    {img}
                </div>
            </foreignObject>
        </Draggable>

    )
}

export default MindmapNode;