
import React, { useState, useEffect, useRef } from 'react';
import MindmapNode from '../MindmapNodes/MindmapNode/MindmapNode';
import ZoomPanWrapper from '../../hoc/ZoomPanWrapper';
import axios from '../../axios_mindmaps';
import Modal from '../UI/Modal/Modal';
import ProjectSelector from '../UI/ProjectSelector/ProjectSelector';
import DummyData from '../../DummyData';
import CreateDummyDataForDb from '../../CreateDummyDataForDb';

const Mindmap = () => {

    const [state, setState] = useState({

        newProjectTemplates: [],
        existingProjects: null,
        mindmapData : null,
        error: false,
        selectedNodeId: "",
        modalShow: true
    })

    const svgContainer = useRef(null);

    function writeData() {
        const data = CreateDummyDataForDb();
        console.log(data)
        saveEntry(data[0]);
        saveEntry(data[1]);
        console.log("DATA LOADED")
    }

    function saveEntry(project) {
        const mindmapRequestBody = {
            filename: project.title,
            mindmapJSONString: JSON.stringify(project)
        }
        axios.post('/mindmapsJSON/', mindmapRequestBody)
                .then(response => console.log(response))
                .catch(error => console.log(error))
                .finally(console.log(mindmapRequestBody)); 
    }

    useEffect(() => {

        const requests = [axios.get('/projectTemplates/'), axios.get('/mindmapsJSON/')];

        Promise.all(requests)
            .then(responses => {
                const templatesResponse = responses[0];
                const projectsResponse = responses[1];
                
                const templateList = templatesResponse.data.map(template => {
                    return {
                        id: template.id,
                        name: template.templateName,
                        template: JSON.parse(template.templateJSONString)
                    }
                });

                const existingProjects = projectsResponse.data.map(project => {
                    return {
                        id: project.id,
                        name: project.filename,
                        mindmap: JSON.parse(project.mindmapJSONString)
                    }
                });

                setState({
                    ...state,
                    newProjectTemplates: templateList,
                    existingProjects: existingProjects
                });


            })
            .catch(errors => {
                console.log(errors);
                setState({
                    ...state,
                    error: true
                })
            });

        /* axios.get('/projectTemplates/')
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

        axios.get('/mindmapsJSON/')
            .then(response => {
                console.log(response.data);
                const existingProjects = response.data.map(project => {
                    return {
                        id: project.id,
                        name: project.filename,
                        mindmap: JSON.parse(project.mindmapJSONString)
                    }
                });
                setState({
                    ...state,
                    existingProjects: existingProjects
                });
            })
            .catch(error => {
                setState({
                    ...state,
                    error: true
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

    const createNewProjectFromTemplate = (id) => {
        const template = state.newProjectTemplates.find(t => t.id === id).template;
        console.log("SELECTED TEMPLATE: ", template);
        setState({
            ...state,
            mindmapData: template,
            modalShow: false
        });
    }

    const loadExistingProject = (id) => {
        const project = state.existingProjects.find(p => p.id === id)
        console.log("LOADED ID", id);
        console.log("LOADED PROJECT", project.mindmap);
        setState({
            ...state,
            mindmapData: project.mindmap,
            modalShow: false
        })
    }

    function loadLocalDummy() {
        if(!state.error)
            return;

        setState({
            ...state,
            mindmapData: DummyData(),
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
            adjustWidth={console.log("IMPLEMENT ADJUS WIDTH")} />);
    }

    return (
        <>  
            <div style={{position: "fixed", top: "0"}}>
                <button onClick={showProjectSelector} >MENU</button>
                
            </div>
            
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
                    existingProjects = {state.existingProjects}
                    errorLoadingData = {state.error}
                    selectTemplate = {createNewProjectFromTemplate}
                    selectLocal = {loadLocalDummy}
                    loadProject = {loadExistingProject}
                    writeDataToDb = {writeData}
                    />
            </Modal>
        </>
    )
}

export default Mindmap;