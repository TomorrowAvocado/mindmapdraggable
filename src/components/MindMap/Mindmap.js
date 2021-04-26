
import React, { useState, useEffect, useRef } from 'react';
import MindmapNode from '../MindmapNodes/MindmapNode/MindmapNode';
import ZoomPanWrapper from '../../hoc/ZoomPanWrapper';
import axios from '../../axios_mindmaps';

const Mindmap = () => {

    const [state, setState] = useState({

        mindmapData :   {
            id: "Some UUID",
            title: "MY MINDMAP!!",
            mainNode: {
                id: "Eve",
                x: 0,
                y: 100,
                nodeWidth: 300,
                nodeHeight: 100,
                layout: "mindmap",
                children: [
                    {
                        id: "EveChild",
                        x: 300,
                        y: 200,
                        nodeWidth: 300,
                        nodeHeight: 100,
                        layout: "mindmap",
                        children: [
                            {
                                id: "EveGrandChild",
                                x: 600,
                                y: 300,
                                nodeWidth: 300,
                                nodeHeight: 100,
                                layout: "mindmap",
                                children: []
                            }
                        ]
                    }
                ]
            } 
        },
        error: false,
        selectedNodeId: ""
    })

    const svgContainer = useRef(null);

    const saveMindmap = () => {
        const mindmapRequestBody = {
            filename: "test1",
            mindmapJSONString: JSON.stringify(state.mindmapData)
        }
        axios.post('/mindmapsJSON/', mindmapRequestBody)
            .then(response => console.log(response))
            .catch(error => console.log(error))
            .finally(console.log(mindmapRequestBody));
    }

    /* useEffect(() => {
        axios.get('/mindmapsJSON/1')
            .then(response => {
                console.log(response.data.mindmapJSONString);
                const mindmapData = JSON.parse(response.data.mindmapJSONString);
                this.setState({
                    mindmapData: mindmapData
                });
            })
            .catch(error => {
                setState({
                    error: false
                })
            });
    }, []) */

    const updateMainNode = (node, index) => {
        // This method gets called from the MindMapNode component
        // The MindMapNode will send its index. The index indicates its placement in the children list. 
        // In this case, the index is whatever we sent as a prop from here.
        // This method does not need the index since this.state.mindmapNode is not an array.
        // The MindmapNode component has a corresponding method called updateChild().

        setState(prevState => ({
            ...prevState,
            mainNode: node
        }))
    }

    const handleSelectedNode = (id) => {
        setState({
            ...state,
            selectedNodeId: id
        })
        console.log("AAAAAAH", state.selectedNodeId)
    }

    console.log(state.mindmapData)
    let content = <text>LOADING MINDMAP...</text>
    if(state.error) {
        content = <text>"ERROR READING DATA..."</text>;
    }
    if(state.mindmapData) {
        console.log("FROM DATABASE:")
            console.log(state.mindmapData);
        console.log("END")
        content = (<MindmapNode
            node={state.mindmapData.mainNode} 
            parentX={state.mindmapData.mainNode.x} 
            parentY={state.mindmapData.mainNode.y}
            parentWidth={state.mindmapData.mainNode.nodeWidth}
            parentHeight={state.mindmapData.mainNode.nodeHeight}
            reportToParent={updateMainNode.bind(this)}
            handleSelected={handleSelectedNode}
            index={0} />);
        console.log("CONTENT: ", content);
    }

    return (
        <svg
        ref={svgContainer} 
        width="100vw" 
        height="100vh" 
        style={{backgroundColor: "#BBB"}}>
            <ZoomPanWrapper ref = {svgContainer}>
            <MindmapNode
                node={state.mindmapData.mainNode} 
                parentX={state.mindmapData.mainNode.x} 
                parentY={state.mindmapData.mainNode.y}
                parentWidth={state.mindmapData.mainNode.nodeWidth}
                parentHeight={state.mindmapData.mainNode.nodeHeight}
                reportToParent={updateMainNode.bind(this)}
                handleSelected={handleSelectedNode}
                index={0}
                selectedNodeId = {state.selectedNodeId} />
            </ZoomPanWrapper>
            
    </svg>
    )
}

export default Mindmap;