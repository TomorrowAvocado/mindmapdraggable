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

    let templateButtons =  <p>LOADING BUTTONS...</p>;
    if (props.errorLoadingData) {
        templateButtons =  <p>ERROR LOADING TEMPLATES...click background to go local</p>;
    }
    if (props.newProjectTemplates.length > 0) {
        console.log("TEMPLATES LOADED:", state.newProjectTemplates)
        templateButtons = props.newProjectTemplates.map((template, index) => (
                <button 
                    key={index}
                    onClick={() => props.selectTemplate(template.id)}>
                    {template.name}
                </button>
            ));
        console.log("BUTTONS: ", templateButtons)
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
