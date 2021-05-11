import React from 'react';

import './ProjectSelector.css';

/**
 * Generates a new-project selector, and a load project selector.
 * New project selector contains a button for each available project template
 * Load project selector contatins a list of existing projects.
 * @param {*} props 
 * @returns ProjectSelector Component
 */
const ProjectSelector = (props) => {

    // GENERATE NEW PROJECT SELECTOR

    let templateButtons =  <span>LOADING BUTTONS...</span>;

    if (props.errorLoadingData) {
        templateButtons =  (
            <>
                <button className={"template-button"} onClick={props.selectLocal}>Use local data (testing)</button>
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


    // GENERATE NEW PROJECT SELECTOR

    let projectList = <p>LOADNING PROJECTS...</p>;

    if(props.errorLoadingData) {
        projectList = <p style={{color: "red"}}>ERROR LOADING PROJECTS</p>;
    }

    if(props.existingProjects) {
        if (props.existingProjects.length < 1) {
            projectList = (
                <>
                    <button className={"add-projects-to-db-button"} onClick={props.writeDataToDb} >CLICK TO ADD 2 PROJECTS TO DB</button>
                    <p>(THEN REFRESH PAGE)</p>
                </>
            );
        }
        else {

            projectList = props.existingProjects.map((project, index) => (

                    <button className={"project-button"} key={index} onClick={() => props.loadProject(project.id)}>
                        {project.name}
                    </button>
            
                ));

        }
    }

    return (

        <div className={"project-selector"} >
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
