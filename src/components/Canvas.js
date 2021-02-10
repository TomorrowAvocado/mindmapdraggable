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
            outgoingEdges: []
        }],
        edges: [{}]
    }

    createNewNode = (parentIndex) => {
        const parentNode = this.state.nodes[parentIndex];
        console.log(parentNode.nodeWidth, parentNode.nodeHeight);
        const newId = getId();
        const newX = parentNode.x + 200;
        const newY = parentNode.y - 200;
        const newWidth = parentNode.nodeWidth * 0.8;
        const newHeight = parentNode.nodeHeight * 0.8;
        const newCenterX = newX + newWidth / 2;
        const newCenterY = newY + newHeight / 2;

        console.log("Parent position: ", parentNode.x, parentNode.y );
        console.log("Parent center: ", parentNode.centerX, parentNode.centerY);
        console.log("Child position: ", newX, newY);
        console.log("Child dimensions: ", newWidth, newHeight, newCenterX, newCenterY);

        const newNode = {
            id: newId,
            parentId: parentNode.id,
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
            centerX: newCenterX,
            centerY: newCenterY,
            incomingEdgeId: 0,
            outgoingEdges: []
        }
        
        const newEdge = {
            id: getId(),
            parentId: newNode.parentId,
            childId: newNode.id,
            x1: newNode.centerX, 
            y1: newNode.centerY,
            x2: parentNode.centerX,
            y2: parentNode.centerY
        }
        
        newNode.incomingEdgeId = newEdge.id;
        parentNode.outgoingEdges.push(newEdge.id);

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
        console.log(this.state.nodes[draggedNodeIndex]);
        console.log("containerdimensions w x h: ", containerDimensions.width, containerDimensions.height );
        /* console.log("element: ", e.target)
        console.log(containerDimensions);
        console.log(containerDimensions.x, containerDimensions.y);
        console.log("x,y: ", updatedNode.x, updatedNode.y);  */

        updatedNode.x = containerDimensions.x;
        updatedNode.y = containerDimensions.y;
        updatedNode.centerX = updatedNode.x + updatedNode.nodeWidth / 2
        updatedNode.centerY = updatedNode.y + updatedNode.nodeHeight / 2

        /* console.log("X,Y: ", updatedNode.x, updatedNode.y);
        console.log("cX,cY:", updatedNode.centerX, updatedNode.centerY); */

        const nodes = [...this.state.nodes];
        nodes[draggedNodeIndex] = updatedNode;

        if(updatedNode.incomingEdgeId !== 0) {
            const updatedEdgeIndex = this.state.edges.findIndex(edge => {
                return edge.id === updatedNode.incomingEdgeId
            });
            const edge = { ...this.state.edges[updatedEdgeIndex]}

            edge.x1 = updatedNode.centerX;
            edge.y1 = updatedNode.centerY;

           
            const edges = [...this.state.edges];
            edges[draggedNodeIndex] = edge;

            this.setState({
                edges: edges
            })
        }

        console.log("updated node outgoingEdgeId", updatedNode.outgoingEdges);

        if(updatedNode.outgoingEdges) {
            updatedNode.outgoingEdges.map(edgeId => {
                const edgeIndex = this.state.edges.findIndex(e => { return e.id === edgeId})
                console.log(edgeIndex);
                this.state.edges[edgeIndex].x2 = updatedNode.centerX;
                this.state.edges[edgeIndex].y2 = updatedNode.centerY;
            });
        }
        //edges[outgoingIndex] = outgoingEdge
         
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
                        <MindmapEdge 
                            key={edge.id} 
                            edge={edge} />   
                )}
                {this.state.nodes.map((node, index) =>
                   
                        <MindmapNode 
                            key={node.id}
                            node={node} 
                            mouseEnter={this.handleMouseEnterNode.bind(this, index)} 
                            mouseLeave={this.handleMouseLeaveNode.bind(this, index)}
                            plusBtnClicked={this.createNewNode.bind(this, index)} 
                            handleSelected={this.handleSelected.bind(this, index)}
                            dragStopped={this.handleDragNodeRelease.bind(this, index)}
                        />
                )}
            </svg>
        )
    }
}

export default Canvas