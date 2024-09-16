const penaltyModel = require('../../domain/models/penaltyModel');
const Penalty = require('../../domain/entities/penalty');
const {mapSequelizePenaltyToDomain} = require('../../domain/map/mapperPenalty');

class PenaltyRepository{
    async createPenalty(memberCode,daysPenalty){
        try{
            const penalty= await penaltyModel.create({memberCode,daysPenalty});
            return penalty;
        }catch(err){
            console.error("Error Simpan data loan :",err)
        }    
    }

    async save(penalty){
        let savePenalty={
            code : penalty.code,
            title : penalty.daysPenalty
        }
        try{
            await penaltyModel.upsert(savePenalty);
            console.log("Data Berhasil di Save");
        }catch(err){
            console.error("Tidak dapat Save data book : ",err);
        }
    }

    async findByCode(code){
        try {
            const penalty=await penaltyModel.findOne({
                where : { code : code}
            });

            if (penalty){
                const mapPenalty= mapSequelizePenaltyToDomain(penalty);
                return mapPenalty;
            }else{
                console.log('penalty tidak ditemukan');
            }

        }catch(err){
            console.error("error mencari Penalty: "+err);
        }
    }


}

module.exports=PenaltyRepository;