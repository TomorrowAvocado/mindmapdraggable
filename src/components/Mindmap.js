
import React, { Component } from 'react';
import MindmapNode from './MindmapNode';
import axios from '../axios_mindmaps';

export default class Mindmap extends Component {

    state = {
        mindmapData : {
         id: "Some UUID",
        title: "MY MINDMAP!!",
        mainNode: {
            id: "Eve",
            x: 0,
            y: 0,
            layout: "mindmap",
            children: [
                {
                    id: "EveChild",
                    x: 50,
                    y: 0,
                    layout: "mindmap",
                    children: [
                        {
                            id: "EveGrandChild",
                            x: 100,
                            y: 0,
                            layout: "mindmap",
                            children: []
                        }
                    ]
                }
            ]
        } }
    }

    saveMindmap() {
        const mindmapRequestBody = {
            filename: "test1",
            mindmapJSONString: JSON.stringify(this.state.mindmapData)
        }
        axios.post('/mindmapsJSON/', mindmapRequestBody)
            .then(response => console.log(response))
            .catch(error => console.log(error))
            .finally(console.log(mindmapRequestBody));
    }

    componentDidMount() {
        axios.get('/mindmapsJSON/2')
            .then(response => {
                this.setState({mindmapData: response.data});
            })
            .catch(error => {
                this.setState({
                    error: true
                })
            });
    }

    updateMainNode(node, index) {
        // This method gets called from the MindMapNode component
        // The MindMapNode will send its index. The index indicates its placement in the children list. 
        // In this case, the index is whatever we sent as a prop from here.
        // This method does not need the index since this.state.mindmapNode is not an array.
        // The MindmapNode component has a corresponding method called updateChild().

        this.setState(prevState => ({
            ...prevState,
            mainNode: node
        }))
    }

    render() {
        let content = <p>LOADING MINDMAP...</p>
        if(this.state.mindmapData) {
            console.log("FROM DATABASE:")
                console.log(this.state.mindmapData);
            console.log("END")
            content = <MindmapNode node={this.state.mindmapData.mainNode} reportToParent={this.updateMainNode.bind(this)} index={0} />
        }
        return (
            <>
                {content}
            </>
        )
    }
}
