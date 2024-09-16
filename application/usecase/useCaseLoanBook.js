const loanService = require('../service/loanService');
const bookService = require('../service/BookService');
const memberService = require('../service/MemberService');
const dateService = require ('../service/DateService');

class UseCaseLoanBook{
    
    
    async loanBook(codeMember,codeBook,loanDate){
        const returnDueDate=dateService.addDaysToDate(loanDate,7);
        const member= await memberService.checkMemberPenalized(codeMember);
        console.log(" member: "+member.code)
        try{
        if (await loanService.isMemberloanOverTwoBooks(codeMember)){
            console.log("Member sudah meminjam Buku Lebih dari 2 kali");
            return {
                messages : "Member sudah meminjam Buku Lebih dari 2 kali"
            };
        }else if(!(await bookService.checkIsAvailableBook(codeBook))){
            console.log("Buku tidak tersedia");
            return {
                messages : "Buku tidak tersedia"
            };
        }else if(member.dayPenalties>0){
            console.log("Member Terkena Sanksi");
            return {
                messages : "Member Terkena Sanksi"
            };
        }else{
            console.log("Transaksi Aman");
            loanService.createLoan(loanDate,returnDueDate,codeBook,codeMember);
            bookService.checkOutBook(codeBook);
            return {
                messages : "Transaksi Aman",
                response : member.dayPenalties
            };
        }
        }catch(err){
            console.error("Tidak bisa melakukan loanBook : "+err);
        }
    }
}
module.exports = new UseCaseLoanBook;