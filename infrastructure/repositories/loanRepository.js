const loanModel = require('../../domain/models/loanModel');
const bookModel = require('../../domain/models/BookModel');
const memberModel = require('../../domain/models/memberModel');
const { Sequelize } = require('sequelize');

class LoanRepository{
    async createLoan(loanDate,returnDueDate,bookCode,memberCode){
        const returnDate=null;
        try{
            const loan= await loanModel.create({loanDate,returnDueDate,returnDate,bookCode,memberCode});
            return loan;
        }catch(err){
            console.error("Error Simpan data loan :",err)
        }    
    }

    async getLoanBooks(){
        try {
            const loanBooks = await loanModel.findAll({
                attributes : ['bookCode'],
                group: ['bookCode']
            })

            const loanBooksCodes = loanBooks.map(loan => loan.bookCode);
            return loanBooksCodes;
        }catch(err){
            console.error("error mendapatkan getLoanBooks: "+err)
        }
    }
    async getNumberMemberLoanBooks(memberCode){
        try{
            const borrowCount = await loanModel.findAll({
                attributes: [
                    [Sequelize.fn('COUNT', Sequelize.col('bookCode')), 'borrowedBooksCount']

                ],
                where: { memberCode },
                raw: true
            });
            return borrowCount[0].borrowedBooksCount;
        }catch(err){
            console.error("Gagal menampilkan getNumberLoanBooks"+err);
        }
    }

    async isMemberLoanBook(bookCode,memberCode){
        try{
            const isLoan=await loanModel.findOne({
                where: {
                    bookCode: bookCode,
                    memberCode:memberCode
                  }
            })

            if(isLoan){
                return true;
            }
            return false;
        }catch(err){
            console.error("Tidak dapat melakukan isMemberLoanBook :"+err)
        }        
    }

    async getReturnDueDate(bookCode,memberCode){
        try{
            const isLoan=await loanModel.findOne({
                where: {
                    bookCode: bookCode,
                    memberCode:memberCode
                  }
            })
        return isLoan.returnDueDate;
        }catch(err){
            console.error("Tidak dapat melakukan isMemberLoanBook :"+err)
        }        
    }
}

module.exports=LoanRepository;

