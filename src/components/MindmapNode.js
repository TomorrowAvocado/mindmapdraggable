import Draggable from 'react-draggable';
import React, { Component } from 'react'

// Temporary solution for generating ID
let id = 0
const getId = () => {
    id++
    return id
}



class MindmapNode extends Component {
    state = {
        ...this.props.node
    }

    createNewNode(x, y) {
        const newNode = {
            id: getId(), // Temporary solution //// brukes kun for å se forskjell på nodene i debugging.
            x: x,
            y: y,
            children: []
        }
        return newNode
    }

    handlePlusBtnClick() {
        // Create copy of this node
        let thisNode = this.state
        // Create new node
        const newNode = this.createNewNode(this.state.x + 50, 0)
        // Add the new node to "children" in the copy of this node
        thisNode.children = [...thisNode.children, newNode]

        // Report this change to my parent. Use the copy of the node as parameter. (State will be set later when props arrive)
        this.props.addMeToMyParent(thisNode, this.props.index)
    }

    // My kids know this method as props.addMeToMyParent.
    addChildToState(node, index) {
        let stateChildren = this.state.children
        // Update child in children
        stateChildren[index] = node
        this.setState(prevState => ({
            ...prevState,
            children: stateChildren
        }))
        // I better report the change to my parent.
        this.props.addMeToMyParent(this.state, this.props.index)
    }

    render() {
        return (
            <div /* style={{position: "absolute"}} */>
                <Draggable /* position={{ x: this.state.x, y: this.state.y }} */ >
                    <div style={{ border: "solid", padding: "10px" }}>
                        <div onClick={this.handlePlusBtnClick.bind(this)} style={{ border: "solid" }} >
                            Create new node
                        </div>
                    </div>
                </Draggable>

                {this.state.children.map((child, index) => (
                    <MindmapNode node={child} className={child.id} addMeToMyParent={this.addChildToState.bind(this)} index={index} />
                ))}
            </div>
        )
    }
}

export default MindmapNode;