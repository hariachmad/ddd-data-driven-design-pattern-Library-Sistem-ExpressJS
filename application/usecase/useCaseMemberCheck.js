const memberService= require('../service/MemberService');

class useCaseMemberCheck{
    async getDataMembers(){
        const members = await memberService.getAllMembersWithLoanBooks();
        console.log("members: "+members);
        return members;
    }
}

module.exports= new useCaseMemberCheck;