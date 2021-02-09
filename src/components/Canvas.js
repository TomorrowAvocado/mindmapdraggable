import { getByTestId } from '@testing-library/react';
import React, { Component } from 'react'
import { useState } from "react";
import MindmapEdge from './MindmapEdge';
import MindmapNode from './MindmapNode'

let idCounter = 3
const getId = () => {
    idCounter ++;
    return idCounter;
}


class Canvas extends Component {

state = { 
    nodes: [{ 
        id: 1,
        parentId: 0,
        title: "node one",
        strokeColor: "green",
        strokeWidth: 3,
        fill: "white",
        isSelected: false,
        buttonVisible: "hidden",
        x: 500,
        y: 500,
        nodeWidth: 200,
        nodeHeight: 100,
        centerX: 600,
        centerY: 550,
        containerDimensions: null,
        parentDimensions: null
    }],
    edges: [{}]
}

createNewNode = (parentIndex) => {
     const newNode = {
        id: getId(),
        parentId: this.state.nodes[parentIndex].id,
        title: "node two",
        strokeColor: "green",
        strokeWidth: 3,
        fill: "white",
        isSelected: true,
        buttonVisible: "hidden",
        x: 500,
        y: 500,
        nodeWidth: 200,
        nodeHeight: 100,
        centerX: 600,
        centerY: 550,
        containerDimensions: null,
        parentDimensions: null
    }

    const newEdge = {
        id: getId(),
        parentId: newNode.parentId,
        childId: newNode.id,
        x1: newNode.centerX, 
        y1: newNode.centerY,
        x2: 0,
        y2: 0
    }

    this.setState({
        nodes: [...this.state.nodes, newNode], 
        edges: [...this.state.edges, newEdge]
    })
    // Set new node as selected 
    this.handleSelected(newNode.id) 
    console.log("Parent: ", newNode.parentId)
};

handleSelected = (nodeIndex) => {
    this.setState(this.state.nodes.map( (node, index) => {
        if (index === nodeIndex ) {
            node.isSelected = true;
        }
        else
        node.isSelected = false;
    }))
}

handleNodeHover = (node) => {
    this.setState({buttonVisible: true})
}

handleMouseEnterNode = (nodeIndex) => {
    this.setState(this.state.nodes.map( (node, index) => {
        if (index === nodeIndex ) {
            node.buttonVisible = "visible";
        }
    }))
}
handleMouseLeaveNode = (nodeIndex) => {
    this.setState(this.state.nodes.map( (node, index) => {
        if (index === nodeIndex ) {
            node.buttonVisible = "hidden";
        }
    }))
}

    render() {
        return (
            <svg width="100vw" height="100vh" >
                {this.state.edges.map((edge) =>
                    <svg >
                        <MindmapEdge 
                            key={edge.id} 
                            edge={edge} />                        
                    </svg>
                )}
                {this.state.nodes.map((node, index) =>
                    <svg>
                        <MindmapNode 
                            key={node.id} 
                            node={node} 
                            mouseEnter={this.handleMouseEnterNode.bind(this, index)} 
                            mouseLeave={this.handleMouseLeaveNode.bind(this, index)}
                            plusBtnClicked={this.createNewNode.bind(this, index)} 
                            handleSelected={this.handleSelected.bind(this, index)} />
                        
                    </svg>
                )}
            </svg>
        )
    }
}

export default Canvas