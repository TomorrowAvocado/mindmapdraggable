
import React, { useState, useEffect, useRef } from 'react';
import MindmapNode from '../MindmapNodes/MindmapNode/MindmapNode';
import ZoomPanWrapper from '../../hoc/ZoomPanWrapper';
import axios from '../../axios_mindmaps';
import Modal from '../UI/Modal/Modal';
import ProjectSelector from '../UI/ProjectSelector/ProjectSelector';

const Mindmap = () => {

    const [state, setState] = useState({

        newProjectTemplates: [],
        mindmapData : null,
        error: false,
        selectedNodeId: "",
        modalShow: true
    })

    const svgContainer = useRef(null);

    const saveMindmap = () => {
        /* const mindmapRequestBody = {
            filename: "test1",
            mindmapJSONString: JSON.stringify(state.mindmapData)
        }
        axios.post('/mindmapsJSON/', mindmapRequestBody)
            .then(response => console.log(response))
            .catch(error => console.log(error))
            .finally(console.log(mindmapRequestBody)); */
            console.log("SAVED DATA: ", state.mindmapData)
    }

    useEffect(() => {
        axios.get('/projectTemplates/')
            .then(response => {

                console.log("PARSED TEMPLATE DATA: ", JSON.parse(response.data[0].templateJSONString));

                const templateList = response.data.map(template => {
                    return {
                        id: template.id,
                        name: template.templateName,
                        template: JSON.parse(template.templateJSONString)
                    }
                });

                console.log("READY LIST: ", templateList)

                setState({
                    ...state,
                    newProjectTemplates: templateList
                });

            })
            .catch(error => {
                setState({
                    ...state,
                    error: true
                })
            });

        /* axios.get('/mindmapsJSON/1')
            .then(response => {
                console.log(response.data.mindmapJSONString);
                const mindmapData = JSON.parse(response.data.mindmapJSONString);
                setState({
                    ...state,
                    mindmapData: mindmapData
                });
            })
            .catch(error => {
                setState({
                    ...state,
                    error: false
                })
            }); */
    }, [])

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
        });
    }

    const showProjectSelector = () => {
        setState({...state, modalShow:true});
    }

    const loadNewProjectFromTemplate = (index) => {
        const template = state.newProjectTemplates.find(t => t.id === index).template;
        console.log("SELECTED TEMPLATE: ", template);
        setState({
            ...state,
            mindmapData: template,
            modalShow: false
        });
    }

    function loadLocalDummy() {
        if(!state.error)
            return;

        setState({
            ...state,
            mindmapData: {
                id: "Some UUID",
                title: "MY MINDMAP!!",
                mainNode: {
                    id: "Eve",
                    text: "MAIN NODE (LOCAL)",
                    x: 0,
                    y: 100,
                    nodeWidth: 300,
                    nodeHeight: 100,
                    layout: "mindmap",
                    children: [
                        {
                            id: "EveChild",
                            text: "SUB NODE",
                            x: 300,
                            y: 200,
                            nodeWidth: 200,
                            nodeHeight: 100,
                            layout: "mindmap",
                            children: [
                                {
                                    id: "EveGrandChild",
                                    text: "SUBSUB NODE",
                                    x: 600,
                                    y: 300,
                                    nodeWidth: 150,
                                    nodeHeight: 100,
                                    layout: "mindmap",
                                    children: []
                                }
                            ]
                        }
                    ]
                } 
            },
            modalShow: false
        });
    }

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
            parent={state.mindmapData.mainNode}
            reportToParent={updateMainNode.bind(this)}
            handleSelected={handleSelectedNode}
            index={0}
            selectedNodeId = {state.selectedNodeId} 
            save={saveMindmap} />);
    }

    return (
        <>  
            <button onClick={showProjectSelector}>MENU</button>
            <svg ref={svgContainer} width="100vw" height="100vh">

                <ZoomPanWrapper 
                    ref = {svgContainer}>
                    {content}
                    {/* <MindmapNode
                        node={state.mindmapData.mainNode}
                        parent={state.mindmapData.mainNode}
                        reportToParent={updateMainNode.bind(this)}
                        handleSelected={handleSelectedNode}
                        index={0}
                        selectedNodeId = {state.selectedNodeId} 
                        save={saveMindmap}/> */}

                </ZoomPanWrapper>
            </svg>
            <Modal show={state.modalShow} modalClosed={loadLocalDummy}>
                <ProjectSelector 
                    newProjectTemplates = {state.newProjectTemplates}
                    selectTemplate = {loadNewProjectFromTemplate}
                    errorLoadingData = {state.error}/>
            </Modal>
        </>
    )
}

export default Mindmap;