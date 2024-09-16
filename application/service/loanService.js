const LoanRepositoryClass = require('../../infrastructure/repositories/loanRepository');
const bookService = require('../service/BookService');
const dateService = require('./DateService');

class LoanService{
    constructor(repository){
        this._repository=repository;
    }

    async createLoan(loanDate,returnDueDate,bookCode,memberCode){
        try{
        await this._repository.createLoan(loanDate,returnDueDate,bookCode,memberCode);
        }catch(err){
            console.error("tidak bisa melakukan createLoan: "+err);
        }
    }

    async getLoanBooks(){
        try{
        const response=await this._repository.getLoanBooks();
        return response;
        }catch(err){
            console.error("Tidak bisa melakukan getLoanBooks: "+err);
        }
    }

    async getNumberMemberLoanBooks(memberCode){
        try{
        const response= await this._repository.getNumberMemberLoanBooks(memberCode);
        return response;
        }catch(err){
            console.error("Tidak bisa melakukan getNumberMemberLoanBooks : "+err);
        }
    }

    async isMemberloanOverTwoBooks(memberCode){
        try{
        const response = await this.getNumberMemberLoanBooks(memberCode);
        if (typeof response==='number'){
            return response > 1 ? true : false;
        }else{
            return parseInt(response) > 1 ? true : false;
        }
    }catch(err){
        console.error("tidak bisa melakukan isMemberloanOverTwoBooks : "+err);
    }
    }

    async isMemberLoanBook(bookCode,memberCode){
        try{
            return await this._repository.isMemberLoanBook(bookCode,memberCode);
        }catch(err){
            console.log("Tidak bisa melakukan isMemberLoanBook :"+err);
        }
    }

    async whichDayLoan(bookCode,memberCode,returnDate){
        try{
        const returnDueDate= await this._repository.getReturnDueDate(bookCode,memberCode);
        const dayDifference= dateService.calculateDateDifference(returnDueDate,returnDate);
        return dayDifference;
        }catch(err){
            console.error("Tidak bisa melakukan whichDayLoan :"+err);
        }
    }

    async isPenalizedLoan(bookCode,memberCode,returnDate){
        try{
            const dayDifference=await this.whichDayLoan(bookCode,memberCode,returnDate);
            if (dayDifference>7){
                return true;
            }
            return false;
        }catch(err){
            console.error("tidak bisa melakukan isPenallizedLoan :"+err)
        }
    }
}

module.exports= new LoanService(new LoanRepositoryClass);