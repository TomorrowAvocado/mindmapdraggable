import axios from "axios";

const instance = axios.create({
    baseURL: 'https://bachelor-mindmap-default-rtdb.firebaseio.com/'
});

export default instance;