import axios from "axios";
import logOut from "./logout.js";
const token = localStorage.getItem('token');
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
}

const getProfileInfo = () => {
    axios.get(`/api/logged-user-info`, {headers : headers})
    .then((res) => {
        localStorage.removeItem('loggedUserInfo');
        localStorage.setItem('loggedUserInfo', JSON.stringify(res.data));
    })
    .catch((err) => {
        throw err
    })
}

export default getProfileInfo