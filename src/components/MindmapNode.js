import { render } from '@testing-library/react';
import React, { Component } from 'react'
import Draggable from 'react-draggable';




/*         const Node = ({node, selected, onClick }) => {

            return (
                <Draggable>
                    <div onClick={onClick} className={selected ? "mindMapNode" : "selectedNode"} contentEditable="true">
                        {this.props.node.title}
                    </div>
                </Draggable>
            )
    } */


class MindmapNode extends Component {
    render() {
        let nodeHeight = 150;
        let nodeWidth = 200;
        let fill = "white";
        return (

                <Draggable>
                    <g>

                        <rect width={nodeWidth} height={nodeHeight} stroke="green" stroke-width="3" fill={fill} >

                        </rect>
                        <foreignObject x="0" y="0" width="200" height={nodeHeight}>
                            
                            <div >
                                <h1 contentEditable="true">{this.props.node.title}</h1>
                            </div>
                        </foreignObject>
                    </g>
                </Draggable>

        )
    }
}





export default MindmapNode;