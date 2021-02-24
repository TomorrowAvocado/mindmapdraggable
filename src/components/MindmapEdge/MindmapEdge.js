import React from 'react';

const MindmapEdge = (props) => {
    return(
        <line 
            x1={props.edge.x1} 
            y1={props.edge.y1} 
            x2={props.edge.x2} 
            y2={props.edge.y2}
            stroke="black"
            strokeWidth="3"
            />
    );
}

export default MindmapEdge;