import { BackendAPI } from "./api.utility";

export default class RegistrationService{
    static getAllRegistrations(){
        return BackendAPI.get('/registration');
    }

    static getAllOneRegistration(eID, payload){
        return BackendAPI.get(`/registration/${eID}`,payload);
        // return BackendAPI.get('/registration/{eID}');
    }    

    static createRegistration(payload){
        return BackendAPI.post('/registration',payload);
    }
}