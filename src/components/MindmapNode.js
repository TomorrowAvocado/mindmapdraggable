import { render } from '@testing-library/react';
import React, { Component } from 'react'
import Draggable from 'react-draggable';




/*         const Node = ({node, selected, onClick }) => {

            return (
                <Draggable>
                    <div onClick={onClick} className={selected ? "mindMapNode" : "selectedNode"} contentEditable="true">
                        {this.props.node.title}
                    </div>
                </Draggable>
            )
    } */


class MindmapNode extends Component {
    state = {
        nodeWidth: 200,
        nodeHeight: 150,
        strokeColor: "green",
        strokeWidth: 3,
        fill: "white",
    }

    render() {

        return (
            <Draggable cancel="h2">
                <g>
                    <foreignObject x="0" y="0" 
                    width={this.state.nodeWidth + this.state.strokeWidth*2} /* Default width plus room for border */
                    height={this.state.nodeHeight + this.state.strokeWidth*2} /* Default height plus room for border */
                    >
                        <div className="mindMapNode" style={{
                            backgroundColor: this.state.fill,
                            borderStyle: "solid",
                            borderColor: this.state.strokeColor,
                            borderWidth: this.state.strokeWidth
                            }}>
                            <button className="createNodeBtn">+</button>
                            <h2 onSelect={e => console.log("get text value")} contentEditable="true">{this.props.node.title}</h2>
                        </div>
                    </foreignObject>
                </g>
            </Draggable>
        )
    }
}



export default MindmapNode;