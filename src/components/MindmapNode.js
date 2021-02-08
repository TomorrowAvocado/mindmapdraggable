import { render } from '@testing-library/react';
import React, { Component } from 'react'
import Draggable from 'react-draggable';

class MindmapNode extends Component {

    state = {
        buttonVisible: false,
    }

    render() {

        return (
            <Draggable cancel="h2">
                <g>
                    <foreignObject x="40vw" y="40vh"
                        width={this.props.node.nodeWidth + this.props.node.strokeWidth * 2} /* Default width plus room for border */
                        height={this.props.node.nodeHeight + this.props.node.strokeWidth * 2} /* Default height plus room for border */
                    >
                        <div onMouseEnter={e => this.setState({ buttonVisible: true })} onMouseLeave={e => this.setState({ buttonVisible: false })}>
                            <button
                                style={{
                                    visibility: this.state.buttonVisible ? "visible" : "hidden",
                                    borderColor: this.props.node.strokeColor
                                }}
                                className="createNodeBtn"
                                onClick={this.props.createNewNode}>+</button>
                            <div
                                onClick={this.props.handleSelected.bind(this, this.props.node.id)}
                                className="mindMapNode"
                                style={this.props.node.isSelected ? {
                                    borderColor: "blue",
                                    backgroundColor: this.props.node.fill,
                                } : {
                                        backgroundColor: this.props.node.fill,
                                        borderStyle: "solid",
                                        borderColor: this.props.node.strokeColor,
                                        borderWidth: this.props.node.strokeWidth
                                    }
                                }
                            >
                                <h2 onClick={e => console.log("get text value")} contentEditable="true">{this.props.node.title}</h2>
                            </div>
                        </div>
                    </foreignObject>
                </g>
            </Draggable>
        )
    }
}

export default MindmapNode;