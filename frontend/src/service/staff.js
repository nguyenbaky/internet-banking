import axios from "axios";
import config from "../config";
import service from "./index";

axios.defaults.baseURL = config.ROOT_API

const getListStaff = () => {
    return axios.get('/user/staff',service.bearerHeader())
    .then(service.handleResponse)
    .catch(service.handleResponse)
        
}

const deleteStaff = (staffID) => {
    return axios.delete(`/user/staff/:${staffID}`,service.bearerHeader())
        .then(service.handleResponse)
        .catch(service.handleResponse)
}

export const staffService = {
    getListStaff,
    deleteStaff,
}