const DummyData = () => {
    /**
     * Creates array of two mindmap projects with dummy data.
     * This data is use to populate the in memory database. (for testing purposes)
     */
    return (
        {
            nodes: [
                {
                    id: 1,
                    parentId: 0,
                    title: "Main node",
                    strokeColor: "black",
                    strokeWidth: 3,
                    fontsize: "20pt",
                    fill: "white",
                    isSelected: false,
                    buttonVisible: "hidden",
                    x: window.innerWidth / 2 - 100,
                    y: window.innerHeight / 2 - 100,
                    nodeWidth: 200,
                    nodeHeight: 100,
                    centerX: window.innerWidth / 2 - 20,
                    centerY: window.innerHeight / 2 - 50,
                    incomingEdgeId: 0,
                    outgoingEdges: []
                }
            ],
            edges: []
        }
        
    );
}

export default DummyData;