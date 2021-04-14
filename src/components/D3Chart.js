import React, { Component } from 'react';
import * as d3 from 'd3';

class D3Chart {
    constructor(element) {        
        const svg = d3.select(element)
            .append("svg")
                .attr("width", "100vw")
                .attr("height", "99vh")

        function dragstarted() {
            d3.select(this).raise();
        }
        function dragged(event, d) {
            console.log(event)
            console.log(d)
            d3.select(this).attr("x", d.x = event.x).attr("y", d.y = event.y);
        }
        function dragended() {
        }

        const rects = svg.selectAll("rect")
            .data([{x: 50, y: 50}])
            
        rects.enter().append("rect")
            .attr("x", ({x}) => x)
            .attr("y", ({y}) => y)
            .attr("width", 50)
            .attr("height", 50)
            .attr("backgroundColor", "grey")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default D3Chart;
