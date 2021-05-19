import React, {useState} from 'react';

import './NodeText.css';

const NodeContent = (props) => {
    const [hasFocus, setHasFocus] = useState(false)

    return (
        <>
            <p className="text-content"
                contentEditable="true" /* TODO: hasFocus insted of props.node.isSelected */
                suppressContentEditableWarning={true}
            >
                {props.node.text}
            </p>
        </>
    )
};

export default NodeContent;