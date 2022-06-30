import { BackendAPI } from "./api.utility";

export default class TeamsService{
    static getAllTeams(){
        return BackendAPI.get('/teams');
    }

    static getOneTeam(eID, payload){
        return BackendAPI.get(`/teams/${teamID}`,payload);
        
    }    

    static createTeam(payload){
        return BackendAPI.post('/teams',payload);
    }
}