
const CreateDummyDataForDb = () => {
    /**
     * Creates array of two mindmap projects with dummy data.
     * This data is use to populate the in memory database. (for testing purposes)
     */
    return (
        [
            {
                id: "UUID001",
                title: "Test Project 1",
                mainNode: {
                    id: "mainnode",
                    text: "Animals",
                    x: 500,
                    y: 500,
                    nodeWidth: 300,
                    nodeHeight: 100,
                    layout: "mindmap",
                    children: [
                        {
                            id: "lvl1nd1",
                            text: "Reptiles",
                            x: 400,
                            y: 200,
                            nodeWidth: 200,
                            nodeHeight: 100,
                            layout: "mindmap",
                            children: [
                                {
                                    id: "lvl1nd1lvl2nd1",
                                    text: "Crocodile",
                                    x: 700,
                                    y: 100,
                                    nodeWidth: 150,
                                    nodeHeight: 100,
                                    layout: "mindmap",
                                    children: []
                                }
                            ]
                        },
                        {
                            id: "lvl1nd2",
                            text: "Mammals",
                            x: 700,
                            y: 600,
                            nodeWidth: 200,
                            nodeHeight: 100,
                            layout: "mindmap",
                            children: [
                                {
                                    id: "lvl1nd2lvl2nd1",
                                    text: "Monkey",
                                    x: 600,
                                    y: 750,
                                    nodeWidth: 150,
                                    nodeHeight: 100,
                                    layout: "mindmap",
                                    children: []
                                }
                            ]
                        }
                    ]
                } 
            },
            {
                id: "UUID001",
                title: "Test Project 2",
                mainNode: {
                    id: "main",
                    text: "Vehicles",
                    x: 500,
                    y: 500,
                    nodeWidth: 300,
                    nodeHeight: 100,
                    layout: "mindmap",
                    children: [
                        {
                            id: "lvl1nd1",
                            text: "Trains",
                            x: 400,
                            y: 200,
                            nodeWidth: 200,
                            nodeHeight: 100,
                            layout: "mindmap",
                            children: [
                                {
                                    id: "lvl1nd1lvl2nd1",
                                    text: "Steamer",
                                    x: 100,
                                    y: 300,
                                    nodeWidth: 150,
                                    nodeHeight: 100,
                                    layout: "mindmap",
                                    children: []
                                }
                            ]
                        },
                        {
                            id: "lvl1nd2",
                            text: "Cars",
                            x: 700,
                            y: 200,
                            nodeWidth: 200,
                            nodeHeight: 100,
                            layout: "mindmap",
                            children: []
                        },
                        {
                            id: "lvl1nd3",
                            text: "Boats",
                            x: 400,
                            y: 600,
                            nodeWidth: 200,
                            nodeHeight: 100,
                            layout: "mindmap",
                            children: []
                        }
                    ]
                } 
            }
        ]
    );
}

export default CreateDummyDataForDb;

