import { BackendAPI } from "utilities/api.utility";

export default class SaleService{
    static createSale(payload){
        return BackendAPI.post('/sales',payload);
    }
}