import React from 'react';

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


    // GENERATE NEW PROJECT SELECTOR

    let projectList = <li>LOADNING PROJECTS...</li>;

    if(props.errorLoadingData) {
        projectList = <li style={{color: "red"}}>ERROR LOADING PROJECTS</li>;
    }

    if(props.existingProjects) {
        if (props.existingProjects.length < 1) {
            projectList = <li><button onClick={props.writeDataToDb} >CLICK TO ADD 2 PROJECTS TO DB</button><span> THEN REFRESH PAGE</span></li>
        }
        else {

            projectList = props.existingProjects.map((project, index) => (

                    <li key={index} onClick={() => props.loadProject(project.id)}>
                        {project.name}
                    </li>
            
                ));

        }
    }

    return (

        <div >

            <div>
                <h3>New Project</h3>
                {templateButtons}
            </div>

            <div>
                <h3>Load Project</h3>
                <ul>
                    {projectList}
                </ul>
            </div>

        </div>
    );
}

export default ProjectSelector;
