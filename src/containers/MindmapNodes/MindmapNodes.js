import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

import MindmapNode from '../../components/MindmapNode/MindmapNode';
import MindmapEdge from '../../components/MindmapEdge/MindmapEdge';


let nodeElementBeingDragged = null;

class MindmapNodes extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            nodes: this.props.nodeList,
            edges: this.props.edgeList ? this.props.edgeList : []
        }
    }
    

    /* static propTypes = {
        nodes: PropTypes.array,
        edges: PropTypes.array
    } */

    handleSelected = (id) => {
        // kanskje en global selected node her, også if(this = global selected) => set class NodeIsSelected
        const nodes = [...this.state.nodes];
        let updatedNodes = nodes.map( (node) => {
            if (node.id === id ) {
                node.isSelected = true;
            }
            else
            node.isSelected = false;
            return node;
        })
        this.setState({nodes: updatedNodes})
    }

    createNewNode = (parentIndex) => {

        /* let image = null;

        if(withImages) {
            image = images[imageCounter++];
        } */

        const parentNode = this.state.nodes[parentIndex];

        // Set Id and dimensions for new node
        const newNodeId = "node" + uuid();
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
            id: newNodeId,
            parentId: parentNode.id,
            title: (""),
            img: null,
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
            id: "edge" + uuid(),
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

        console.log('NEW NODE LIST',  [...this.state.nodes, newNode])
        // Add new node and edge to mindmap data
        this.setState((prevState) => ({
            nodes: [...prevState.nodes, newNode], // THIS DOES NOT WORK!
            edges: [...prevState.edges, newEdge] // BUT THIS DOES??????????????????????
        }))

        console.log('nodes after setState: ', this.state.nodes)

        // Set new node as selected 
        this.handleSelected(newNode.id) 
    };

    handleDragNodeStart = (e) => {
        if(e.target.parentElement) {
            this.nodeElementBeingDragged = e.target.parentElement;
        }
    }

    handleDragNodeStop = (draggedNodeIndex, e) => {
        // Handle dragged node one final time after release
        // to let edges line up
        this.handleDragNode(draggedNodeIndex, e);
        nodeElementBeingDragged = null;
    }

    handleDragNode = (draggedNodeIndex, e) => {
        // Get bounding rectangle from dragged node
        let containerDimensions;
        if(e.target) {
            containerDimensions = this.nodeElementBeingDragged.getBoundingClientRect();
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

    render() {
        
        const nodes = this.state.nodes
            .map((node, index) => {
                return(
                    <MindmapNode 
                        key = {node.id}
                        node = {node}
                        plusBtnClicked={this.createNewNode.bind(this, index)}
                        /* onDrag={this.handleDragNode.bind(this.index)} */
                        onDragStart = {this.handleDragNodeStart.bind(this)}
                        onDragStop = {this.handleDragNodeStop.bind(this, index)}
                        clicked={() => this.handleSelected(node.id)}/>
                );
            });
            
        const edges = this.state.edges.map((edge) =>
            <MindmapEdge 
                key={edge.id} 
                edge={edge} />   
            );

        console.log('nodes', this.state.nodes)
        console.log('edges', this.state.edges)
        return (
            <>
                {edges}
                {nodes}
            </>
        );
    }
}

export default MindmapNodes;