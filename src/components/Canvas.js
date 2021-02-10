import { getByTestId } from '@testing-library/react';
import React, { Component, createRef } from 'react'
import { useState } from "react";
import MindmapEdge from './MindmapEdge';
import MindmapNode from './MindmapNode'

let idCounter = 3
const getId = () => {
    idCounter ++;
    return idCounter;
}


class Canvas extends Component {

    constructor(props) {
        super(props);
        this.nodeRef = createRef();
    }

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
            incomingEdgeId: 0,
            outgoingEdgeId: 0
        }],
        edges: [{}]
    }

    createNewNode = (parentIndex) => {
        const newX = this.state.nodes[parentIndex].x + 200;
        const newY = this.state.nodes[parentIndex].y - 200;
        const newId = getId();

        const newWidth = this.state.nodes[parentIndex].nodeWidth * 0.8;
        const newHeight = this.state.nodes[parentIndex].nodeHeight * 0.8;

        const newNode = {
            id: newId,
            parentId: this.state.nodes[parentIndex].id,
            title: ("node " + newId),
            strokeColor: "green",
            strokeWidth: 3,
            fill: "white",
            isSelected: true,
            buttonVisible: "hidden",
            x: newX,
            y: newY,
            nodeWidth: newWidth,
            nodeHeight: newHeight,
            centerX: newX + 100,
            centerY: newY + 50,
            incomingEdgeId: 0,
            outgoingEdgeId: 0
        }
        
        const newEdge = {
            id: getId(),
            parentId: newNode.parentId,
            childId: newNode.id,
            x1: newNode.centerX, 
            y1: newNode.centerY,
            x2: this.state.nodes[parentIndex].centerX,
            y2: this.state.nodes[parentIndex].centerY
        }
        
        newNode.incomingEdgeId = newEdge.id;

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

    handleDragNodeRelease = (draggedNodeIndex, e) => {
        const containerDimensions = e.target.getBoundingClientRect();

        const updatedNode = {...this.state.nodes[draggedNodeIndex] }

        console.log(containerDimensions);
        console.log("x,y: ", updatedNode.x, updatedNode.y);

        updatedNode.x = containerDimensions.x;
        updatedNode.y = containerDimensions.y;
        updatedNode.centerX = updatedNode.x + containerDimensions.width / 2
        updatedNode.centerY = updatedNode.y + containerDimensions.height / 2

        console.log("X,Y: ", updatedNode.x, updatedNode.y);
        console.log("cX,cY:", updatedNode.centerX, updatedNode.centerY);

        const nodes = [...this.state.nodes];
        nodes[draggedNodeIndex] = updatedNode;

        if(updatedNode.incomingEdgeId !== 0) {
            const updatedEdgeIndex = this.state.edges.findIndex(edge => {return edge.id === updatedNode.incomingEdgeId});
            const edge = { ...this.state.edges[updatedEdgeIndex]}
            edge.x1 = updatedNode.centerX;
            edge.y1 = updatedNode.centerY;
            const edges = [...this.state.edges];
            edges[draggedNodeIndex] = edge;
            this.setState({
                edges: edges
            })
        }

        

        this.setState({
            nodes: nodes
        })
    }

    handleSelected = (nodeIndex) => {
        this.setState(this.state.nodes.map( (node, index) => {
            if (index === nodeIndex ) {
                node.isSelected = true;
            }
            else
            node.isSelected = false;
        }))
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

    updateDimensions(e) {
        const containerDimensions = e.target.getBoundingClientRect();
        console.log(containerDimensions);
        this.setState({
            containerDimensions: containerDimensions
        })
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
                            handleSelected={this.handleSelected.bind(this, index)}
                            dragStopped={this.handleDragNodeRelease.bind(this, index)}
                        />
                    </svg>
                )}
            </svg>
        )
    }
}

export default Canvas