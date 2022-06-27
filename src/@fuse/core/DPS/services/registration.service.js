import { BackendAPI } from "./api.utility";

export default class RegistrationService{
    static getAllRegistrations(){
        return BackendAPI.get('/registration');
    }

    static getAllOneRegistration(){
        return BackendAPI.get('/registration/{eID}');
    }    

    static createRegistration(payload){
        return BackendAPI.post('/registration',payload);
    }
}