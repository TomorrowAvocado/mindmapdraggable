import React, { Component } from 'react'
import { useState } from "react";
import MindmapNode from './MindmapNode'


class Canvas extends Component {

state = { nodes: [{ 
    title: "node one",
    nodeWidth: 200,
    nodeHeight: 150,
    strokeColor: "green",
    strokeWidth: 3,
    fill: "white",
}, 
    { 
    title: "node two",
    nodeWidth: 200,
    nodeHeight: 150,
    strokeColor: "green",
    strokeWidth: 3,
    fill: "white",
    
 },
]}

createNewNode = () => {
    const newNode = {
        title: "node one",
        nodeWidth: 200,
        nodeHeight: 150,
        strokeColor: "green",
        strokeWidth: 3,
        fill: "white",
    }
    this.setState({nodes: [...this.state.nodes, newNode]})
};

    render() {
        return (
            <svg width="100vw" height="100vh" viewBox="0 0 100vw 100vh">
                {this.state.nodes.map(node =>
                    <svg>
                        <MindmapNode node={node} createNewNode={this.createNewNode} />
                    </svg>
                )}
            </svg>
        )
    }
}

export default Canvas