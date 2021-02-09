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
            buttonVisible: "visible",
            x: 500,
            y: 500,
            nodeWidth: 200,
            nodeHeight: 100,
            centerX: 600,
            centerY: 550
        }],
        edges: [{}]
    }

    createNewNode = (parentIndex) => {
        const newX = this.state.nodes[parentIndex].x + 200;
        const newY = this.state.nodes[parentIndex].y - 200;
        const newId = getId();
        const newNode = {
            id: newId,
            parentId: this.state.nodes[parentIndex].id,
            title: ("node " + newId),
            strokeColor: "green",
            strokeWidth: 3,
            fill: "white",
            isSelected: true,
            buttonVisible: "visible",
            x: newX,
            y: newY,
            nodeWidth: 200,
            nodeHeight: 100,
            centerX: newX + 100,
            centerY: newY + 50
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

    handleNodeHover = (e) => {
        this.setState({buttonVisible: "visible"})
    }

    handleDragNodeRelease = (e, data, draggedNodeIndex) => {
        console.log(data);
        const repositionedNode = this.state.nodes[draggedNodeIndex];
        //repositionedNode.x = repositionedNode
        this.setState({
            
        });
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
                    <svg className="overflow">
                        <MindmapNode 
                            key={node.id} 
                            node={node} 
                            hover={this.handleNodeHover} 
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