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

state = { nodes: [{ 
    id: 1,
    title: "node one",
    nodeWidth: 200,
    nodeHeight: 1,
    strokeColor: "green",
    strokeWidth: 3,
    fill: "white",
    isSelected: false,
}, 
    { 
    id: 2,
    title: "node two",
    nodeWidth: 200,
    nodeHeight: 1,
    strokeColor: "orange",
    strokeWidth: 3,
    fill: "white",
    isSelected: false,
 },
]}

createNewNode = (dimensions) => {
    console.log("Dimensions: ", dimensions);
    const newNode = {
        id: getId(),
        title: "node one",
        nodeWidth: 200,
        nodeHeight: 1,
        strokeColor: "green",
        strokeWidth: 3,
        fill: "white",
<<<<<<< HEAD
        parentDimensions: dimensions
=======
        isSelected: true,
>>>>>>> origin/master
    }
    console.log("PARENT DIMS", dimensions);
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

    render() {
        return (
            <svg width="100vw" height="100vh" viewBox="0 0 100vw 100vh" >
                {this.state.nodes.map(node =>
<<<<<<< HEAD
                    <svg>
                        <MindmapNode node={node} createNewNode={this.createNewNode.bind()} />
=======
                    <svg className="overflow">
                        <MindmapNode node={node} key={node.id} createNewNode={this.createNewNode} handleSelected={this.handleSelected} />
>>>>>>> origin/master
                    </svg>
                )}
            </svg>
        )
    }
}

export default Canvas