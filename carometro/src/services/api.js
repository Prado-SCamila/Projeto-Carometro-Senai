import Axios from 'axios';

const api = Axios.create({
    baseURL: "http://localhost:5000/api/Upload/upload",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("foto")
    }
});

export default api;