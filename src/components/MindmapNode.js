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
        return (

                <Draggable>
                    <g>
                        <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="transparent" >

                        </circle>
                        <circle cx="50" cy="50" r="35" stroke="red" stroke-width="3" fill="transparent" >

                        </circle>
                        <foreignObject x="0" y="0" width="100%" height="100">
                            
                            <div>
                                <textarea placeholder={this.props.node.title} contentEditable="true"></textarea>
                                <h1 contentEditable="true">title</h1>
                            </div>
                        </foreignObject>
                    </g>
                </Draggable>

        )
    }
}





export default MindmapNode;