import React, { Component, useState } from 'react'
const NodeText = (props) => {

    const [hasFocus, setHasFocus] = useState(false)

    return (
            <h2 className={hasFocus ? "focusedText" : null}
                onFocus={() => setHasFocus(true)}
                onBlur={() => setHasFocus(false)}
                style={{
                    fontSize: props.node.fontsize,
                    cursor: hasFocus ? "text" : "context-menu",
                    outline: hasFocus ? "black solid 1px" : "none"
                }}

                contentEditable={props.node.isSelected} /* TODO: hasFocus insted of props.node.isSelected */
                suppressContentEditableWarning={true}
            >
                {props.node.title}
            </h2>
    )

}
export default NodeText;