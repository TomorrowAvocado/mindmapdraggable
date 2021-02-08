import { render } from '@testing-library/react';
import React, { Component } from 'react'
import Draggable from 'react-draggable';

class MindmapNode extends Component {

    render() {

        return (
            <Draggable cancel="h2">
                <g>
                    <foreignObject x="40vw" y="40vh" 
                    width={this.props.node.nodeWidth + this.props.node.strokeWidth*2} /* Default width plus room for border */
                    height={this.props.node.nodeHeight + this.props.node.strokeWidth*2} /* Default height plus room for border */
                    >
                        <button className="createNodeBtn" onClick={this.props.createNewNode}>+</button>
                        <div className="mindMapNode" style={{
                            backgroundColor: this.props.node.fill,
                            borderStyle: "solid",
                            borderColor: this.props.node.strokeColor,
                            borderWidth: this.props.node.strokeWidth
                            }}>
                            <h2 onSelect={e => console.log("get text value")} contentEditable="true">{this.props.node.title}</h2>
                        </div>
                    </foreignObject>
                </g>
            </Draggable>
        )
    }
}

export default MindmapNode;