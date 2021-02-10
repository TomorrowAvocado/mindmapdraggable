import { render } from '@testing-library/react';
import React, { Component, createRef, ReactDOM, useRef } from 'react'
import Draggable from 'react-draggable';

const MindmapNode = (props) => {

    return (
        <Draggable cancel="h2" onDrag={(e) => console.log(e.target.getBoundingClientRect())} onStop={props.dragStopped}>
            <g >
                <foreignObject x={props.node.x} y={props.node.y}
                width={props.node.nodeWidth + props.node.strokeWidth*2} // Default width plus room for border 
                height={props.node.nodeHeight + props.node.strokeWidth*2} // Default height plus room for border 
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
                                boxShadow: "0 0 5px blue",
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
                            <h2 
                                onClick={e => console.log("get text value")} 
                                contentEditable="true"
                                suppressContentEditableWarning={true}
                            >
                                    {props.node.title}
                            </h2>
                        </div>
                    </div>
                </foreignObject>
            </g>
        </Draggable>
        
    )
}

export default MindmapNode;