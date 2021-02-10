import { getByTestId } from '@testing-library/react';
import React, { Component, createRef } from 'react'
import { useState } from "react";
import MindmapEdge from './MindmapEdge';
import MindmapNode from './MindmapNode'

import croc from "../assets\\img/croc.png";
import squirrel from "../assets\\img/squirrel.png";
import lion from "../assets\\img/lion.png";
import rhino from "../assets\\img/rhino.png";
import menuDummy from "../assets\\img/menu_dummy.png";


let idCounter = 3
const getId = () => {
    idCounter ++;
    return idCounter;
}

let withImages = false;
let imageCounter = 0;
const images = [croc, squirrel, lion, rhino];


class Canvas extends Component {

    state = { 
        nodes: [{ 
            id: 1,
            parentId: 0,
            title: "Main node",
            img: null,
            strokeColor: "black",
            strokeWidth: 3,
            fontsize: "20pt",
            fill: "white",
            isSelected: false,
            buttonVisible: "hidden",
            x: window.innerWidth / 2 - 120,
            y: window.innerHeight / 2 - 100,
            nodeWidth: 200,
            nodeHeight: 100,
            centerX: window.innerWidth / 2 - 20,
            centerY: window.innerHeight / 2 - 50,
            incomingEdgeId: 0,
            outgoingEdges: []
        }],
        edges: [{}]
    }

    createNewNode = (parentIndex) => {

        let image = null;

        if(withImages) {
            image = images[imageCounter++];
        }

        const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        const parentNode = this.state.nodes[parentIndex];

        // Set Id and dimensions for new node
        const newId = getId();
        const newX = parentNode.x + 200;
        const newY = parentNode.y - 200;
        const newWidth = parentNode.nodeWidth * 0.8;
        const newHeight = parentNode.nodeHeight * 0.8;
        const newCenterX = newX + newWidth / 2;
        const newCenterY = newY + newHeight / 2;

        /* console.log("Parent position: ", parentNode.x, parentNode.y );
        console.log("Parent center: ", parentNode.centerX, parentNode.centerY);
        console.log("Child position: ", newX, newY);
        console.log("Child dimensions: ", newWidth, newHeight, newCenterX, newCenterY); */
    

        // Create child node and set values
        const newNode = {
            id: newId,
            parentId: parentNode.id,
            title: ("Node " + newId),
            img: image,
            strokeColor: "#555",
            strokeWidth: 3,
            fontsize: "14pt",
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
        
        // Create edge from parent node to child node
        const newEdge = {
            id: getId(),
            parentId: newNode.parentId,
            childId: newNode.id,
            x1: newNode.centerX, 
            y1: newNode.centerY,
            x2: parentNode.centerX,
            y2: parentNode.centerY
        }
        
        // Set reference to edge in parent and child node
        newNode.incomingEdgeId = newEdge.id;
        parentNode.outgoingEdges.push(newEdge.id);

        // Add new node and edge to mindmap data
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



    handleDragNode = (draggedNodeIndex, e) => {

        // Get bounding rectangle from dragged node
        let containerDimensions;
        if(e.target.parentElement) {
            containerDimensions = e.target.parentElement.getBoundingClientRect();
        }
        

        const updatedNode = {...this.state.nodes[draggedNodeIndex] }

        console.log("initial x,y: ", updatedNode.x, updatedNode.y, updatedNode.nodeWidth, updatedNode.nodeHeight, updatedNode.centerX, updatedNode.centerY);
        console.log("containerdims: ", containerDimensions.x, containerDimensions.y, containerDimensions.width, containerDimensions.height);

        updatedNode.x = containerDimensions.x;
        updatedNode.y = containerDimensions.y;
        updatedNode.centerX = containerDimensions.x + updatedNode.nodeWidth / 2
        updatedNode.centerY = containerDimensions.y + updatedNode.nodeHeight / 2

        console.log("updated dimensions:", updatedNode.x, updatedNode.y, updatedNode.nodeWidth, updatedNode.nodeHeight, updatedNode.centerX, updatedNode.centerY);

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

        if(updatedNode.outgoingEdges) {

            updatedNode.outgoingEdges.map(edgeId => {

                const edgeIndex = this.state.edges.findIndex(e => { return e.id === edgeId})
                console.log(edgeIndex);
                this.state.edges[edgeIndex].x2 = updatedNode.centerX;
                this.state.edges[edgeIndex].y2 = updatedNode.centerY;

            });

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
            <div>
            <img style={{position: "absolute", zIndex:"999"}} src={menuDummy}/>
            <svg width="100vw" height="99.5vh" >
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
                            dragStopped={this.handleDragNode.bind(this, index)}
                        />
                )}
            </svg>
            <div style={{
                position: "absolute", top: 0, right: 0, 
                width: "2.2vw", height: "2.2vw", zIndex: "9999"}} 
                onClick={() => {withImages = !withImages}}></div>
            </div>
        )
    }
}

export default Canvas