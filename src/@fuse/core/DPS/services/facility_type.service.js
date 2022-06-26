import { BackendAPI } from "./api.utility";

export default class FacilityStatusService{
    static getAllFacilityType(){
        return BackendAPI.get('/facility_type');
    }

    static createFacilityType(payload){
        return BackendAPI.post('/facility_type',payload);
    }
}