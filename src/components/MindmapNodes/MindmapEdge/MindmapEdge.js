import React, { useState, useRef, useEffect } from 'react';

/**
 * Generates a line between two poins, representing
 * an edge between two nodes.
 * @param {*} props 
 * @returns Svg Line element
 */
const MindmapEdge = (props) => {

    const [state, setState] = useState({
        x1: props.x1,
        y1: props.y1,
        x2: props.x2,
        y2: props.y2
    })

    let pathString = '';
    pathString = `M ${state.x1} ${state.y1} l ${state.x2 - state.x1} ${state.y2 - state.y1}`

    return(
        <line 
                x1={state.x1} 
                y1={state.y1} 
                x2={state.x2} 
                y2={state.y2}
                stroke="black"
                strokeWidth="3"
                />
        
    );
}

export default MindmapEdge;
