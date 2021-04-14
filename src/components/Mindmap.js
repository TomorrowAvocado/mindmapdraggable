import React, { Component, useState, useRef, useEffect } from 'react'
import MindmapNode from './MindmapNode';
import * as d3 from 'd3'

import ChartWrapper from './ChartWrapper';
import ZoomWrapper from './ZoomWrapper';

const Mindmap = (props) => {

    const [nodes, setNodes] = useState({
        id: "Some UUID",
        title: "MY MINDMAP!!",
        mainNode: {
            id: "Eve",
            x: 300,
            y: 300,
            nodeWidth: 200,
            nodeHeight: 100,
            strokeWidth: 2,
            layout: "mindmap",
            text: "Main node",
            children: [
                {
                    id: "EveChild",
                    x: 450,
                    y: 450,
                    nodeWidth: 200,
                    nodeHeight: 100,
                    strokeWidth: 2,
                    layout: "mindmap",
                    text: "1st level node",
                    children: [
                        {
                            id: "EveGrandChild",
                            x: 600,
                            y: 600,
                            nodeWidth: 200,
                            nodeHeight: 100,
                            strokeWidth: 2,
                            layout: "mindmap",
                            text: "2nd level node",
                            children: []
                        }
                    ]
                }
            ]
        }
    })

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

    const svgContainer = useRef(null);

    useEffect( () => {
        if (nodes && svgContainer.current) {
            const svg = d3.select(svgContainer.current);  
        }
    },

        /*
            useEffect has a dependency array (below). It's a list of dependency
            variables for this useEffect block. The block will run after mount
            and whenever any of these variables change. We still have to check
            if the variables are valid, but we do not have to compare old props
            to next props to decide whether to rerender.
        */
    [nodes, svgContainer.current])

    return (
        <>
        {/* s */}

        <svg
            ref={svgContainer} 
            width="100vw" 
            height="100vh" 
            viewBox="0,0,1000,800"
            style={{backgroundColor: "#BBB"}}>
                <ZoomWrapper ref = {svgContainer}>
                    <MindmapNode
                        node={nodes.mainNode} 
                        parentX={nodes.mainNode.x} 
                        parentY={nodes.mainNode.y}
                        parentWidth={nodes.mainNode.nodeWidth}
                        parentHeight={nodes.mainNode.nodeHeight}
                        addMeToMyParent={updateMainNode.bind(this)}
                        index={0} />
                </ZoomWrapper>
                
        </svg>
        </>
    )
}

export default Mindmap;