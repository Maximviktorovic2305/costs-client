import axios from "axios";

const instanse = axios.create({
   baseURL: process.env.REACT_APP_SERVER_URL,
});

export default instanse;
