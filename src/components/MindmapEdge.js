import React, { useState, useRef, useEffect } from 'react';

const MindmapEdge = (props) => {

    const [state, setState] = useState({
        x1: props.x1,
        y1: props.y1,
        x2: props.x2,
        y2: props.y2
    })

    useEffect(() => {

    }, [state])

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