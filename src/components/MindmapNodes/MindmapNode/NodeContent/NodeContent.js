import React, {useState} from 'react';

const NodeContent = (props) => {
    const [hasFocus, setHasFocus] = useState(false)

    return (
            <p 
            
                contentEditable="true" /* TODO: hasFocus insted of props.node.isSelected */
                suppressContentEditableWarning={true}
            >
                {props.node.id}
            </p>
    )
};

export default NodeContent;

/* className={hasFocus ? "focusedText" : null}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
                style={{
                    fontSize: props.node.fontsize,
                    cursor: hasFocus ? "text" : "context-menu",
                    outline: hasFocus ? "black solid 1px" : "none"
                }} */