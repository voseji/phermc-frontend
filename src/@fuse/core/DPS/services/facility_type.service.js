import { BackendAPI } from "./api.utility";

export default class FacilityTypeService{
    static getAllFacilityType(){
        return BackendAPI.get('/facility_type');
    }

    static createFacilityType(payload){
        return BackendAPI.post('/facility_type',payload);
    }
}