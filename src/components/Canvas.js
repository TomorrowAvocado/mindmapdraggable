import React, { Component } from 'react'
import { useState } from "react";
import MindmapNode from './MindmapNode'

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