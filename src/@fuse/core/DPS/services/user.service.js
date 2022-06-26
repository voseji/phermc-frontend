import { BackendAPI } from "utilities/api.utility";

export default class UserService{
    static getAllUsers(){
        return BackendAPI.get('/users');
    }

    static createUser(payload){
        return BackendAPI.post('/users',payload)
    }

    static updateUser(id, payload){
        return BackendAPI.patch(`/users/${id}`,payload);
    }

    static updatePassword(id, payload){
        return BackendAPI.patch(`/users/${id}/password`, payload);
    }
}