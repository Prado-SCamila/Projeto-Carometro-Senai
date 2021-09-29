import Axios from 'axios';

const apiFormData = Axios.create({
    baseURL: "http://localhost:5000/api/Upload/upload",
    headers: {
        "Authorization": "Bearer " + localStorage.getItem("foto")
    }
});

export default apiFormData;