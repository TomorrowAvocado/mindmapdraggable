import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import * as d3 from 'd3';

const DragWrapper = (props) => {

    const [state, setState] = useState({
        node: props.data.node,
        parent: props.data.parent
    });
    const nodeRef = useRef(null);

    useEffect(() => {
        if(nodeRef.current) {
            makeDraggable(nodeRef.current)
        }
    }, [nodeRef.current]);

    function makeDraggable(comp) {

        let translateX = 0;
        let translateY = 0;
    
        const handleDrag = d3.drag()
            .subject(function() {
                return { x: translateX, y: translateY }
            })
            .on('drag', function(event, d) {
                const me = d3.select(this);
                const transform = `translate(${event.x}, ${event.y})`;
                translateX = event.x;
                translateY = event.y;
                me.attr('transform', transform);

                const edges = me.selectAll("line");
                edges.each(function(d, i) {
                    d3.select(this)
                        .attr("x1", 0)
                        .attr("y1", 0)
                })

            })
    
        handleDrag(d3.select(comp));
    
    }

    function handleDragged(node) {
        
    }

    return (
        <g ref={nodeRef}>
            {props.children}
        </g>
    );
}

export default DragWrapper;
/* OLD FUNCTION
function makeDraggable(comp) {

    let translateX = 0;
    let translateY = 0;

    const handleDrag = d3.drag()
        .subject(function() {
            const me = d3.select(this);
            return { x: translateX, y: translateY }
        })
        .on('drag', function(event, d) {
            const me = d3.select(this);
            const transform = `translate(${event.x}, ${event.y})`;
            translateX = event.x;
            translateY = event.y;
            me.attr('transform', transform);
        })

    const node = ReactDOM.findDOMNode(comp);

    handleDrag(d3.select(node));

} */