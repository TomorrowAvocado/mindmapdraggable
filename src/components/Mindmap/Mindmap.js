
import React, { Component } from 'react';

import axios from '../../dataAccess/axios_mindmaps';
import DummyData from '../../dataAccess/DummyData';
import CreateDummyDataForDb from '../../dataAccess/CreateDummyDataForDb';

import Toolbar from '../UI/Toolbar/Toolbar';
import ZoomPanWrapper from '../../hoc/ZoomPanWrapper';

import MindmapNode from '../MindmapNodes/MindmapNode/MindmapNode';
import MindmapEdge from '../MindmapNodes/MindmapEdge/MindmapEdge';

import Modal from '../UI/Modal/Modal';
import ProjectSelector from '../UI/ProjectSelector/ProjectSelector';



let idCounter = 0;
const getId = () => {
    idCounter ++;
    return idCounter;
}

let nodeElementBeingDragged = null;


class Mindmap extends Component {

    state = { 
        nodes: this.props.nodes,
        edges: [{}]
    }

    svgContainer = React.createRef(null);

    createNewNode = (parentIndex) => {

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

        // Create child node and set values
        const newNode = {
            id: newId,
            parentId: parentNode.id,
            title: ("Node " + newId),
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
        if(!parentNode.outgoingEdges) {
            parentNode.outgoingEdges = [];
        }
        parentNode.outgoingEdges.push(newEdge.id);
        parentNode.isSelected = false;
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
            console.log("NewNodeIndex", nodeIndex)
            if (index === nodeIndex ) {
                node.isSelected = true;
            }
            else
                node.isSelected = false;
        })) 
    }

    handleDragNodeStart = (e) => {
        if(e.target.parentElement) {
            this.nodeElementBeingDragged = e.target.parentElement;
        }
    }

    handleOnDragStop = (draggedNodeIndex, e) => {
        // Handle dragged node one final time after release
        // to let edges line up
        this.handleDragNode(draggedNodeIndex, e);
        nodeElementBeingDragged = null;
    }

    handleDragNode = (draggedNodeIndex) => {

        // Get bounding rectangle from dragged node
        let containerDimensions = this.nodeElementBeingDragged.getBoundingClientRect();
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

    render() {
        console.log(this.state.nodes[0]);
        console.log(this.state.edges[0]);
        return (
            <div>
            
            <svg width="100vw" height="99.5vh" ref={this.svgContainer} >
                {this.state.edges.map((edge) =>
                        <MindmapEdge 
                            key={edge.id} 
                            edge={edge} />   
                )}
                {this.state.nodes.map((node, index) =>
                        <MindmapNode 
                            key={node.id}
                            node={node} 
                            plusBtnClicked={this.createNewNode.bind(this, index)} 
                            handleSelected={this.handleSelected.bind(this, index)}
                            onDragStart={this.handleDragNodeStart.bind(this)}
                            onDrag={this.handleDragNode.bind(this, index)}
                            onDragStop={this.handleOnDragStop.bind(this, index)}
                        />
                )}
            </svg>
            
            </div>
        )
    }
}

export default Mindmap;