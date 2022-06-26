import { BackendAPI } from "utilities/api.utility";

export default class ManufacturerService{
    static getAllManufacturers(){
        return BackendAPI.get('/manufacturers');
    }

    static createManufacturer(payload){
        return BackendAPI.post('/manufacturers',payload);
    }
}