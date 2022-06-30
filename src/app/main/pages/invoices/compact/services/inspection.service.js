import { BackendAPI } from "./api.utility";

export default class InspectionService{
    static getAllInspections(){
        return BackendAPI.get('/inspection');
    }

    static createInspection(payload){
        return BackendAPI.post('/inspection',payload);
    }
}