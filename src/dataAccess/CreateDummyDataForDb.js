const CreateDummyDataForDb = () => {
    /**
     * Creates array of two mindmap projects with dummy data.
     * This data is use to populate the in memory database. (for testing purposes)
     */
    return (
        [
            {
                id: "UUID001",
                title: "Test Project 1"
            }
        ]
    );
}

export default CreateDummyDataForDb;