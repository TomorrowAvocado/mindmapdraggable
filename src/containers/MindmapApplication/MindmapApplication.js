import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from '../../axios-mindmaps';
import MindmapNodes from '../MindmapNodes/MindmapNodes';

class MindmapApplication extends Component {

    state = {
       mainNode: null,
       nodeData: null,
       edgeData: null,
       error: false
       /*
            AuthToken
            Filepath
            Template
        */
    }

    /* static propTypes = {
        nodeData: PropTypes.object(),
        edgeData: PropTypes.object(),
        error: PropTypes.bool
    } */

    componentDidMount() {
        
        axios.get('/mindmapNodes.json')
            .then(response => {

                /* const nodeArray = Object.values(response.data); */
                const nodeArray = Object.keys(response.data).map(key => response.data[key]);
                console.log("ARRAY: ", nodeArray);

                this.setState({
                    mainNode: nodeArray[0],
                    nodeData: nodeArray
                });
            })
            .catch(error => {
                this.setState({
                    error: error
                });
                console.log("[axios-mindmaps] read nodes returned error: ", error);
            });
        
        axios.get('/mindmapEdges.json')
            .then(response => {
                this.setState({edgeData: response.data});
            })
            .catch(error => {
                this.setState({
                    error: true
                });
                console.log("[axios-mindmaps] read edges returned error");
            });
 
    }
    
    render() {
        let mindmapNodes = this.state.error ? <div>Mindmap cannot be loaded, and fuck Netgear</div> : <div>Loading mindmap...</div>

        if(this.state.nodeData) {
            mindmapNodes = <MindmapNodes mainNode={this.state.mainNode} nodeList={this.state.nodeData} edgeList={this.state.edgeData}/>
        }
        return (
            <main>
                <div>BackButton</div>
                <div>ProjectSelector</div>
                <div>Toolbar</div>
                <svg width="100vw" height="99.5vh" >
                    {mindmapNodes}
                </svg>
            </main>
        )
    }
}

export default MindmapApplication;
