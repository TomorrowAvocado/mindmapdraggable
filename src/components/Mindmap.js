
import React, { Component } from 'react'
import MindmapNode from './MindmapNode';

export default class Mindmap extends Component {

    state = {
        id: "Some UUID",
        title: "MY MINDMAP!!",
        mainNode: {
            id: "Eve",
            x: 0,
            y: 0,
            layout: "mindmap",
            children: [
                {
                    id: "EveChild",
                    x: 50,
                    y: 0,
                    layout: "mindmap",
                    children: [
                        {
                            id: "EveGrandChild",
                            x: 100,
                            y: 0,
                            layout: "mindmap",
                            children: []
                        }
                    ]
                }
            ]
        }
    }

    updateMainNode(node, index) {
        // This method gets called from the MindMapNode component
        // The MindMapNode will send its index. The index indicates its placement in the children list. 
        // In this case, the index is whatever we sent as a prop from here.
        // This method does not need the index since this.state.mindmapNode is not an array.
        // The MindmapNode component has a corresponding method called updateChild().

        this.setState(prevState => ({
            ...prevState,
            mainNode: node
        }))
    }

    render() {
        return (
            <MindmapNode node={this.state.mainNode} reportToParent={this.updateMainNode.bind(this)} index={0} />
        )
    }
}
