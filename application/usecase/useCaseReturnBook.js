const loanService = require("../service/loanService");
const penaltyService = require("../service/penaltyService");

class useCaseReturnBook{
    async returnBook(codeBook,codeMember,returnDate){
        try{
        const isPenalized = await loanService.isPenalizedLoan(codeBook,codeMember,returnDate);
        if(isPenalized){
            penaltyService.createPenalty(codeMember,3);
            await bookService.returnBook(codeBook);
            return {
                messages: "Buku berhasil dikembalikan, Anda mendapatkan Penalty selama 3 hari Dikarenakan Mengembalikan buku lebih dari tanggal pengembalian yang sudah ditentukan"
            }
        }
        await bookService.returnBook(codeBook);
        return {
            messages: "Buku berhasil dikembalikan, Tidak ada penalty"
        }
    }catch(err){
        console.log("Tidak bisa membuat useCaseReturnBook :"+err);
    }
    }
}

module.exports=new useCaseReturnBook;