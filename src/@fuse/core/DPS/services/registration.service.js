import { BackendAPI } from "./api.utility";

export default class RegistrationService{
    static getAllRegistrations(){
        return BackendAPI.get('/registration');
    }

    static createRegistration(payload){
        return BackendAPI.post('/registration',payload);
    }
}