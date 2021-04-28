import React from 'react';

const DummyData = () => {
        
    return {
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
    }

}

export default DummyData;
