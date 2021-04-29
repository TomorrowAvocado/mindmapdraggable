import React from 'react';

const Toolbar = (props) => {
    return (
        <div style={{position: "fixed", top: "0"}}>
            <button onClick={props.menuClicked} >MENU</button>
        </div>
    );
}

export default Toolbar;
