import React, { Component } from 'react'
import MindmapNode from './MindmapNode';

export default class Mindmap extends Component {

    constructor() {
        super()

        this.state = {
            id: "Some UUID",
            title: "MY MINDMAP!!",
            mainNode: {
                id: "Eve",
                x: 400,
                y: 400,
                layout: "mindmap",
                text: "Main node",
                children: [
                    {
                        id: "EveChild",
                        x: 450,
                        y: 450,
                        layout: "mindmap",
                        text: "1st level node",
                        children: [
                            {
                                id: "EveGrandChild",
                                x: 500,
                                y: 500,
                                layout: "mindmap",
                                text: "2nd level node",
                                children: []
                            }
                        ]
                    }
                ]
            }
        }
    }

    updateMainNode(node, index) {
        // This method gets called from the MindMapNode component
        // The MindMapNode will send its index. The index indicates its placement in the children list. 
        // In this case, the index is whatever we sent as a prop from here.
        // This method does not need the index since mindmapNode is not an array.
        // MindmapNode has a corresponding method called addChildToState().

        this.setState({
            mainNode: node
        })
    }

    render() {
        return (
            <svg width="1000" height="800">
                <MindmapNode node={this.state.mainNode} addMeToMyParent={this.updateMainNode.bind(this)} index={0} />
            </svg>
        )
    }
}
