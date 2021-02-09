import { getByTestId } from '@testing-library/react';
import React, { Component } from 'react'
import { useState } from "react";
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
        title: "node one",
        nodeWidth: 200,
        nodeHeight: 1,
        strokeColor: "green",
        strokeWidth: 3,
        fill: "white",
        isSelected: false,
        buttonVisible: "hidden",
        x: 500,
        y: 500,
        centerX: 0,
        centerY: 0,
        containerDimensions: null,
        parentDimensions: null
    }],
    edges: [{}]
}

createNewNode = (parentId) => {
    const newNode = {
        id: getId(),
        parentId: parentId,
        title: "node two",
        nodeWidth: 200,
        nodeHeight: 1,
        strokeColor: "green",
        strokeWidth: 3,
        fill: "white",
        parentDimensions: 0,
        isSelected: true
    }
    this.setState({nodes: [...this.state.nodes, newNode]})
    /* Set new node as selected */
    this.handleSelected(newNode.id)
};

handleSelected = (id) => {
    this.setState(this.state.nodes.map( node => {
        if (node.id === id ) {
            node.isSelected = true;
        }
        else
        node.isSelected = false;
    }))
}

handleNodeHover = (e) => {
    this.setState({buttonVisible: true})
}
    render() {
        return (
            <svg width="100vw" height="100vh" viewBox="0 0" preserveAspectRatio="xMaxYmin slice">
                {this.state.nodes.map(node =>
                    <svg className="overflow">
                        <MindmapNode node={node} hover={this.handleNodeHover} key={node.id} createNewNode={this.createNewNode} handleSelected={this.handleSelected} />
                    </svg>
                )}
            </svg>
        )
    }
}

export default Canvas