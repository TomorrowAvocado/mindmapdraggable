
import React, { Component, createRef, ReactDOM, useRef, useState } from 'react'
import Draggable from 'react-draggable';
import NodeText from './NodeText';



const MindmapNode = (props) => {

    const [dim, setDim] = useState({
        x: props.node.x,
        y: props.node.y
    })
    //console.log("actual coords: ", dim.x, dim.y)

    let img = null;

    if(props.node.img) {
        img =  <img src={props.node.img}/>
    }

    useEffect(() => {
        console.log('RENDER!');
      }, [dim]);

    return (
        <Draggable cancel=".focusedText" /* Cancels drag on className="focusedText" */
            /* onDrag={(e) => console.log(e.target.getBoundingClientRect())}  */
            onDrag={props.onDrag}
            onStart={props.onDragStart}
            onStop={props.onDragStop}>
            <foreignObject
                x={dim.x} y={dim.y}
                /* x={props.node.x} y={props.node.y} */
                width={props.node.nodeWidth + props.node.strokeWidth*2}
                height={props.node.nodeHeight + props.node.strokeWidth*2}
            >
                <div onMouseEnter={props.mouseEnter} onMouseLeave={props.mouseLeave}>
                    <button
                        style={{
                            backgroundColor: props.node.strokeColor,
                            border: "none",
                            color: "white",
                            visibility: props.node.buttonVisible
                        }}
                        className="createNodeBtn"
                        onClick={props.plusBtnClicked}>+</button>

                    <div
                        onClick={props.handleSelected}
                        className="mindMapNode"
                        style={props.node.isSelected ? {
                            boxShadow: "0 0 10px blue",
                            backgroundColor: props.node.fill,
                            borderColor: props.node.strokeColor,
                        } : {
                                backgroundColor: props.node.fill,
                                borderStyle: "solid",
                                borderColor: props.node.strokeColor,
                                borderWidth: props.node.strokeWidth
                            }
                        }
                    >
                        <NodeText node={props.node} />
                        {img}
                    </div>
                </div>
            </foreignObject>
        </Draggable>

    )
}

export default MindmapNode;