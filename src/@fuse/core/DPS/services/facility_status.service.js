import { BackendAPI } from "./api.utility";

export default class FacilityStatusService{
    static getAllFacilityStatus(){
        return BackendAPI.get('/facility_status');
    }

    static createFacilityStatus(payload){
        return BackendAPI.post('/facility_status',payload);
    }
}