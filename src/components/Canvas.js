import React, { Component } from 'react'
import { useState } from "react";
import MindmapNode from './MindmapNode'



/* const Canvas = () => {
    const [selectedNode, setSelectedNode] = useState();
    const nodes = [{ title: "node one" }, { title: "node two" }]
    return (

        <div>
            {nodes.map(node =>
                <MindmapNode 
                node={nodes[node]}
                selected={node === selectedNode}
                onClick={() => setSelectedNode(node)}
                />
            )}
        </div>
    )
} */


const nodes = [{ title: "node one" }, { title: "node two" }]
class Canvas extends Component {
    render() {
        return (
            <svg width="100vw" height="100vh" viewBox="0 0 100vw 100vh">
                {nodes.map(node =>
                    <svg>
                        <MindmapNode node={node} />
                    </svg>
                )}
            </svg>
        )
    }
}


export default Canvas