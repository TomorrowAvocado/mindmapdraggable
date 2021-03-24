import React, { Component, useState, useRef, useEffect } from 'react'
import MindmapNode from './MindmapNode';
import * as d3 from 'd3'

const Mindmap = () => {

    const [nodes, setNodes] = useState({
        id: "Some UUID",
        title: "MY MINDMAP!!",
        mainNode: {
            id: "Eve",
            x: 300,
            y: 300,
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
                            x: 600,
                            y: 600,
                            layout: "mindmap",
                            text: "2nd level node",
                            children: []
                        }
                    ]
                }
            ]
        }
    })

    const [tool, setTool] = useState(TOOL_AUTO)

    const Viewer = useRef(null);

    useEffect(() => {
        Viewer.current.fitToViewer();
    }, []);

    const _zoomOnViewerCenter = () => Viewer.current.zoomOnViewerCenter(1.1)
    const _fitSelection = () => Viewer.current.fitSelection(40, 40, 200, 200)
    const _fitToViewer = () => Viewer.current.fitToViewer()

    const updateMainNode = (node, index) => {
        // This method gets called from the MindMapNode component
        // The MindMapNode will send its index. The index indicates its placement in the children list. 
        // In this case, the index is whatever we sent as a prop from here.
        // This method does not need the index since mindmapNode is not an array.
        // MindmapNode has a corresponding method called addChildToState().

        this.setState({
            mainNode: node
        })
    }

    return (
        <svg width="1000" height="800" style={{backgroundColor: "white"}}>
            <MindmapNode 
                node={nodes.mainNode} 
                parentX={nodes.mainNode.x} 
                parentY={nodes.mainNode.y}
                addMeToMyParent={updateMainNode.bind(this)}
                index={0} />
        </svg>
    )
}

export default Mindmap;