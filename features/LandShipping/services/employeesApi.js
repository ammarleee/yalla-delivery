import  axios from "./mainApi";

class employees {
    static CreateEmployees(user) {
        return axios().post("employee", user)
    } 
}
export default employees