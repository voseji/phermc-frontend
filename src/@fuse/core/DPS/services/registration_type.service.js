import { BackendAPI } from "./api.utility";

export default class RegistrationTypeService{
    static getAllRegistrationType(){
        return BackendAPI.get('/registration_type');
    }

    static createOneRegistrationType(payload){
        return BackendAPI.post('/registration_type',payload);
    }
}