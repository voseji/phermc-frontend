import { BackendAPI } from "./api.utility";

export default class AreaCouncilsService{
    static getAllAreaCouncils(){
        return BackendAPI.get('/area_councils');
    }

    static createAreaCouncil(payload){
        return BackendAPI.post('/area_councils',payload);
    }

    static getAllDistricts(){
        return BackendAPI.get('/districts');
    }
}