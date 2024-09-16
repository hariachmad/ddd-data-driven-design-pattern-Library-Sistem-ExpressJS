const Member = require('../../domain/entities/Member');
const memberModel=require('../../domain/models/memberModel')
const {mapSequelizeMemberToDomain}=require('../../domain/map/mapperMember');

class MemberRepository{
    async findByCode(code){
        try{
            const member=await memberModel.findOne({
                where : {
                    code:code
                }
            });

            if (member){
                console.log('Member Ditemukan');
                if(!(mapSequelizeMemberToDomain(member) instanceof Member)){
                    throw new Error("Instace dari member tidak sesuai")
                }
                return mapSequelizeMemberToDomain(member);
            }
        }catch(err){
            console.error("error mencari buku : "+err+" ")
        }
    }
    async save(member){
        let saveMember={
            code : member.code,
            nama : member.nama
        }

        try{
            await memberModel.upsert(saveMember);
            console.log("Data berhasil di save");
        }catch(err){
            console.error("Tidak dapat save data member: ",err)
        }
    }

    async getAllMembers(){
        const members=[];
        try{
            const membersModel = await memberModel.findAll();
            console.log("membersModel: "+membersModel);
            membersModel.forEach(element => {
                members.push(mapSequelizeMemberToDomain(element));
            });
            console.log("members: "+members[0].name);
            return members;
        }catch(err){
            console.error("terjadi error ketika mengambil data semua member : "+err);
        }
    }

    async isMemberPenalized(codeMember){
        try{
        const member = await this.findByCode(codeMember);
        }catch(err){
            console.error("Error exec function isMemberPenalized :"+err)
        }

    }
}

module.exports=MemberRepository;