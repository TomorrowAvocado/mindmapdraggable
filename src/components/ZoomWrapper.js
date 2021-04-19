import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3';

const ZoomWrapper = React.forwardRef((props, ref) => {

    const gRef = useRef(null)

    useEffect( () => {
        const svg = d3.select(ref.current)
        const g = d3.select(gRef.current)
        
        function zoomed({transform}){
            g.attr("transform", transform);
        }

        svg.call(d3.zoom()
        .extent([[1, 1], [1000, 800]])
        .scaleExtent([0.2, 5])
        .on("zoom", zoomed)); 
    })

    return (
        <g ref = {gRef}>
            {props.children}
        </g>
    );
})

export default ZoomWrapper;
