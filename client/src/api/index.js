import axios from "axios";
const URL_BASE = "http://localhost:3001/api/";

const instance = axios.create({
    baseURL: URL_BASE,
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;