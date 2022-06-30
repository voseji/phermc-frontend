import { BackendAPI } from "./api.utility";

export default class InspectionTypeService{
    static getAllInspectionType(){
        return BackendAPI.get('/inspection_type');
    }

    static createOneInspectionType(payload){
        return BackendAPI.post('/inspection_type',payload);
    }
}