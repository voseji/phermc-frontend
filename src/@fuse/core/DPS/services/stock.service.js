import { BackendAPI } from "utilities/api.utility";

export default class StockService{
    static getAllStock(){
        return BackendAPI.get('/stock');
    }

    static createStock(payload){
        return BackendAPI.post('/stock',payload);
    }

    static registerDamage(stockId, payload){
        return BackendAPI.patch(`/stock/${stockId}`,payload);
    }

    static calculateAvailableStock(stock){
        return stock.quantityReceived - stock.quantitySold - stock.quantityDamaged;
    }
}