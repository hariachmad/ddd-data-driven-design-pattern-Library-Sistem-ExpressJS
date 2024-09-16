const PenaltyRepository = require("../../infrastructure/repositories/penaltyRepository");

class PenaltyService{
    constructor(repository){
        this._repository=repository;
    }
    async createPenalty(memberCode,daysPenalty){
        try{
        await this._repository.createPenalty(memberCode,daysPenalty);
        }catch(err){
            console.error("tidak bisa melakukan createPenalty: "+err);
        }
    }

    async getDaysPenalty(code){
        try{
            const penalty = await this._repository.findByCode(code);
            console.log("penalty : "+penalty.daysPenalty);
            return penalty.daysPenalty;
        }catch(err){
            console.error("Tidak bisa melakukan fungsi getDaysPenalty :"+err)
        }
    }
}

module.exports=new PenaltyService(new PenaltyRepository);