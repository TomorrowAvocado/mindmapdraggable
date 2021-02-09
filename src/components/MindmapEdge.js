import React from 'react';

const MindmapEdge = (props) => {
    return(
        <g>
            <line 
                x1={this.state.centerX} 
                y1={this.state.centerY} 
                x2={this.state.parentDimensions ? (this.state.parentDimensions.x + this.state.parentDimensions.width * 5) : "500"} 
                y2={this.state.parentDimensions ? (this.state.parentDimensions.y + this.state.parentDimensions.height * 2) : "200"} strokeWidth="2" stroke="black"
                />
        </g>
    );
}

export default MindmapEdge;