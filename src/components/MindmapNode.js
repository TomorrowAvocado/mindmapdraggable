import Draggable from 'react-draggable';
import React, { Component } from 'react'

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
            id: getId(), // Temporary solution //// brukes kun for å se forskjell på nodene i debugging.
            x: x,
            y: y,
            children: []
        }
        return newNode
    }

    handlePlusBtnClick() {
        const newNode = this.createNewNode(this.state.x + 50, 0)
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

        return (
            <div>
                <Draggable position={{ x: this.state.x, y: this.state.y }} >
                    <div style={{ border: "solid" }}>
                        <div onClick={this.handlePlusBtnClick} >
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