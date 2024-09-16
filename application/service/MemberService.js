const MemberRepositoryClass = require('../../infrastructure/repositories/MemberRepository');
const penaltyService= require('../service/penaltyService');
const loanService = require('../service/loanService');

class MemberService{

    constructor(repository){
        if(!(repository instanceof MemberRepositoryClass)){
            console.log(Object.getPrototypeOf(repository).constructor);
            throw new Error("Instance untuk BookRepository tidak sesuai");
        }
        this._repository=repository;
    } 

    async getAllMembersWithLoanBooks(){
        try{
            const members=await this._repository.getAllMembers();
            const membersLoan=await this.setMembersLoanBooks(members);
            
            return membersLoan;
    }catch(err){
        console.error("tidak bisa melakukan getAllMemberWithLoanBooks : "+err);
    }
    }

    async setMembersLoanBooks(members){
        try {
            const arr = await Promise.all(members.map(async (element) => {
                try {
                    const numberMemberLoanBooks = await loanService.getNumberMemberLoanBooks(element.code);
                    element.setNumberOfCurrentLoans(numberMemberLoanBooks);
                    return {
                        code: element.code,
                        name : element.name,
                        numberOfCurrentLoans: element.numberOfCurrentLoans
                    };
                } catch (error) {
                    console.error('Error processing member:', error);
                    return null; // atau return objek default jika diinginkan
                }
            }));
    
            // Filter hasil yang null jika ada error
            const filteredArr = arr.filter(item => item !== null);
            console.log("arr:", filteredArr);
            return filteredArr;
        } catch (error) {
            console.error('Error processing members:', error);
            return [];
        }

    //     const arr=[];
    //     await members.forEach(async function (element) {
    //         const numberMemberLoanBooks=await loanService.getNumberMemberLoanBooks(element.code);
    //         element.setNumberOfCurrentLoans(numberMemberLoanBooks);
    //         // console.log(element.code+" "+element.numberOfCurrentLoans);
    //         arr.push(
    //             {
    //                 code : element.code,
    //                 numberOfCurrentLoans : element.numberOfCurrentLoans
    //             }
    //         )
    //         console.log(arr);
    // });
    // console.log("arr: "+arr)
    // return arr;
    }

    async checkMemberPenalized(codeMember){
        try{
        const member = await this._repository.findByCode(codeMember);
        const daysPenalty=await penaltyService.getDaysPenalty(codeMember);
        console.log("daysPenalty: "+daysPenalty);
        member.setDayPenalties(daysPenalty);
        console.log("member.dayPenalties setelah setDayPenalties: "+member.dayPenalties);
        return member;
        
        }catch(err){
            console.error("tidak bisa melakukan checkMemberPenalized :"+err);
        }
    }
}

module.exports= new MemberService(new MemberRepositoryClass);