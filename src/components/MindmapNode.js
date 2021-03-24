import Draggable from 'react-draggable';
import React, { Component } from 'react'

import NodeText from './NodeText';
import MindmapEdge from './MindmapEdge';
import './MindmapNode.css';

// testing start (Midlertidig løsning)
let id = 0
const getId = () => {
    id++
    return id
}
// testing slutt

// Note to self: 
// Når den lager ny node, blir ikke det første klikket registrert i state.
// Tror oppdateringen hos forfedrene henger ett klikk etter.

//
// Code begins here:
//

class MindmapNode extends Component {
    constructor(props) {
        super(props)
        // State represent the node itself in this class. Think of this.state as a node, THIS node, actually.
        this.state = {
            ...props.node
        }
        this.handlePlusBtnClick = this.handlePlusBtnClick.bind(this)
    }

    createNewNode(x, y) {
        const newNode = {
            id: getId(),
            x: x,
            y: y,
            children: []
        }
        return newNode
    }

    handlePlusBtnClick() {
        const newNode = this.createNewNode(this.state.x + 100, 0)
        // Add new node to children in state
        this.setState({
            children: [...this.state.children, newNode]
        })
        // Report change to parent
        this.props.addMeToMyParent(this.state, this.props.index)
    }

    addChildToState(node, index) {
        let stateChildren = this.state.children
        // Update child in children
        stateChildren[index] = node
        this.setState({
            children: stateChildren
        })

        // Call the same method in parent node
        this.props.addMeToMyParent(this.state, this.props.index)
    }

    render() {

        let styles = "MindmapNode";

        if(this.props.node.isSelected) {
            styles = styles + " NodeIsSelected";
        }

        return (
            <>
                {this.state.children.map((child, index) => (
                    //generer bare barn
                    //ved flytting manipulerer denne node sin forelder edge
                    // og for hvert barn
                    <MindmapNode 
                        node={child} 
                        parentX={this.state.x}
                        parentY={this.state.y}
                        className={child.id}
                        addMeToMyParent={this.addChildToState.bind(this)}
                        index={index} />
                ))}
                <MindmapEdge 
                    x1={this.props.parentX + 30} 
                    y1={this.props.parentY + 30} 
                    x2={this.state.x + 30} 
                    y2={this.state.y + 50}/>
                <Draggable 
                    cancel=".focusedText" /* Cancels drag on className="focusedText" */
                    onDrag={this.onDrag}
                    onStart={this.props.onDragStart}
                    onStop={this.props.onDragStop}>
                    <foreignObject 
                        /* x={dim.x} y={dim.y}  */
                        x={this.state.x} y={this.state.y}
                        width={this.props.node.nodeWidth + this.props.node.strokeWidth*2}  
                        height={this.props.node.nodeHeight + this.props.node.strokeWidth*2}>

                        <div 
                            onClick={this.props.handleSelected}
                            className={styles}>

                            <button
                                className="createNodeBtn"
                                onClick={this.props.plusBtnClicked}>+</button>

                           <NodeText node={this.props.node} />

                        </div>
                    </foreignObject>
                </Draggable>

                
            </>
        )
    }
}

export default MindmapNode;