import { BackendAPI } from "./api.utility";

export default class RegistrationProcessingStage{
    static getAllProcessingStage(){
        return BackendAPI.get('/processing_stage');
    }

    static createProcessingStage(payload){
        return BackendAPI.post('/processing_stage',payload);
    }
}