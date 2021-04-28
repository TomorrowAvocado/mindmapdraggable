import React, {useEffect, useState} from 'react';
import axios from '../../../axios_mindmaps';

const ProjectSelector = (props) => {

    const [state, setState] = useState({
        newProjectTemplates: [],
        loadableProjects: [],
        error: false
    });

    useEffect(() => {
        
    }, [])

    const projectList = (
        <ul>
            <li>List of projects here</li>
            <li>Yet to be implemented</li>
        </ul>
    );

    let templateButtons =  <span>LOADING BUTTONS...</span>;
    if (props.errorLoadingData) {
        templateButtons =  (
            <>
                <button onClick={props.selectLocal}>Use local data (testing)</button>
                <span style={{color: "red", marginLeft: "20px"}}>ERROR LOADING TEMPLATES</span>
            </>
        );
    }
    if (props.newProjectTemplates.length > 0) {
        templateButtons = props.newProjectTemplates.map((template, index) => (
                <button 
                    key={index}
                    onClick={() => props.selectTemplate(template.id)}>
                    {template.name}
                </button>
            ));
    }

    return (
        <div >
            <div>
                <h3>New Project</h3>
                {templateButtons}
            </div>
            <div>
                <h3>Load Project</h3>
                {projectList}
            </div>
        </div>
    );
}

export default ProjectSelector;
