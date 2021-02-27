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
            id: getId(), // Temporary solution //// brukes foreløpig kun for å se forskjell på nodene i debugging.
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
        this.props.reportToParent(thisNode, this.props.index)
    }

    // My children know this method as props.reportToParent.
    updateChild(updatedChild, index) {
        // I'll just create a copy of myself, and replace the child that is updated.
        let thisNode = this.state
        thisNode.children[index] = updatedChild

        // I better report the change to my parent.
        this.props.reportToParent(thisNode, this.props.index)
        // Now I wait for the new props to arrive.
        // My parent will do the same procedure. It will report to its parent, and its parent will report to its parent, and so forth.
        // At one point, the Mindmap component is actually the parent!
        // That's when the big render starts, and we all get our new props that will define our new state and shape as a whole.
        // ... Not that my state will be any different from what I reported to my parent, though.
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
                    <MindmapNode node={child} className={child.id} reportToParent={this.updateChild.bind(this)} index={index} />
                ))}
            </div>
        )
    }
}

export default MindmapNode;