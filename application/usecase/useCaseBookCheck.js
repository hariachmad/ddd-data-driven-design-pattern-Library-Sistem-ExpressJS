const bookService = require('../service/BookService')

class useCaseBookCheck{

    async getAvailableBooks(){
        try{
        return await bookService.getAvailableBooks();
        }catch(err){
            console.error("Tidak bisa menjalankan fungsi getAvailableBooks: "+err)
        }
    }
}

module.exports = new useCaseBookCheck;