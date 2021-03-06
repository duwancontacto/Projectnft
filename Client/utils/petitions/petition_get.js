
import axios from "axios"
import configEntorno from "../config.json"

const petition_get = (key, data) => {
    let userData = JSON.parse(localStorage.getItem("userAuth"))
    let url;
    switch (key) {
        case "GetUsers":
            url = `${configEntorno.urlBase}/api/login`;
            break;
        default:
            return "error";
    }
    var config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": userData ? userData.token : "",
        },
    };



    return axios.get(url, config)
}



export default petition_get