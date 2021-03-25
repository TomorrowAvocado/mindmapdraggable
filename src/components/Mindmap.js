import React, { Component, useState, useRef, useEffect } from 'react'
import MindmapNode from './MindmapNode';
import * as d3 from 'd3'

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
            //const svg = d3.create("svg").attr("viewBox", [0, 0, 1000, 800]);

            const g = svg.append("g").attr("cursor", "grab");

            function dragstarted() {
                d3.select(this).raise();
                g.attr("cursor", "grabbing");
            }
        
            function dragged(event, d) {
                d3.select(this).attr("cx", d.x = event.x).attr("cy", d.y = event.y);
            }
        
            function dragended() {
                g.attr("cursor", "grab");
            }
        
            function zoomed({transform}){
                g.attr("transform", transform);
            }

            g.selectAll("circle")
            .data([{x: 50, y: 50}, {x: 150, y: 150}])
            .join("circle")
            .attr("cx", ({x}) => x)
            .attr("cy", ({y}) => y)
            .attr("r", 50)
            .attr("fill", "red")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
            
            g.selectAll("text")
                .data([{x: 50, y: 50}, {x: 150, y: 150}])
                .join("text")
                    .attr("x", ({x}) => x)
                    .attr("y", ({y}) => y)
                    .text("Hello world")

            svg.call(d3.zoom()
                .extent([[0, 0], [1000, 800]])
                .scaleExtent([1, 8])
                .on("zoom", zoomed));          
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

        <svg 
            ref={svgContainer} 
            width="100vw" 
            height="100vh" 
            viewBox="0,0,1000,800"
            style={{backgroundColor: "#BBB"}}>
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