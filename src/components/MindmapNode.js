import { render } from '@testing-library/react';
import React, { Component, createRef, ReactDOM, useRef } from 'react'
import Draggable from 'react-draggable';

class MindmapNode extends Component {

    constructor(props) {
        super(props);
        this.nodeRef = createRef();
    }

    state = {
        buttonVisible: false,
        x: "800",
        y: "350",
        centerX: 0,
        centerY: 0,
        containerDimensions: null,
        parentDimensions: null
    }

    updateDimensions(e) {
        const containerDimensions = e.target.getBoundingClientRect();
        console.log(containerDimensions);
        this.setState({
            containerDimensions: containerDimensions
        })
    }

    componentDidMount() {
        const containerDimensions = this.nodeRef.current.getBoundingClientRect();
        console.log("PARENT Props: ", this.props.node.parentDimensions)
        this.setState({
            centerX: (containerDimensions.x + containerDimensions.width / 2),
            centerY: (containerDimensions.y + containerDimensions.height / 2),
            containerDimensions: containerDimensions,
            parentDimensions: this.props.node.parentDimensions
        });
        
    }

    render() {
        console.log("PARENT State: ", this.state.parentDimensions);
        console.log("THIS State: ", this.state.containerDimensions);
        return (
            <Draggable cancel="h2" onStop={this.updateDimensions.bind(this)}>
                <g >
                    <line 
                    x1={this.state.centerX} 
                    y1={this.state.centerY} 
                    x2={this.state.parentDimensions ? (this.state.parentDimensions.x + this.state.parentDimensions.width * 5) : "500"} 
                    y2={this.state.parentDimensions ? (this.state.parentDimensions.y + this.state.parentDimensions.height * 2) : "200"} strokeWidth="2" stroke="black"/>

                    <foreignObject x={this.state.x} y={this.state.y} 
                    width={this.props.node.nodeWidth + this.props.node.strokeWidth*2} // Default width plus room for border 
                    height={this.props.node.nodeHeight + this.props.node.strokeWidth*2} // Default height plus room for border 
                    >
                        <div ref={this.nodeRef} onMouseEnter={e => this.setState({buttonVisible: true})} onMouseLeave={e => setTimeout(() => {this.setState({buttonVisible: false})}, 200) }>
                            <button 
                                style={{
                                    visibility: this.state.buttonVisible ? "visible" : "hidden",
                                    backgroundColor: this.props.node.strokeColor,
                                    border: "none",
                                    color: "white"
                                }} 
                                className="createNodeBtn" 
                                onClick={this.props.createNewNode.bind(this, this.state.containerDimensions)}>+</button>
                    
                            <div
                                onClick={this.props.handleSelected.bind(this, this.props.node.id)}
                                className="mindMapNode"
                                style={this.props.node.isSelected ? {
                                    boxShadow: "0 0 5px blue",
                                    backgroundColor: this.props.node.fill,
                                    borderColor: this.props.node.strokeColor,
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