const book = require('../../domain/models/BookModel');
const BookRepositoryClass= require('../../infrastructure/repositories/bookRepository')


class BookService{
    constructor(repository){
        if(!(repository instanceof BookRepositoryClass)){
            console.log(Object.getPrototypeOf(repository).constructor);
            throw new Error("Instance untuk BookRepository tidak sesuai");
        }
        this._repository=repository;
    }

    async checkIsAvailableBook(code){
        try{
        const book=await this._repository.findByCode(code);
        return book.isAvailable;
    }catch(err){
        console.error("tidak bisa melakukan checkIsAvailableBook : "+err);
    }
    }

    async checkOutBook(code){
        try{
            const book=await this._repository.findByCode(code);
            if (!book) throw new Error('Buku Tidak ada');
            if (!book.isAvailable) throw new Error('Stok Buku Habis');
            book.setStock(book.stock-1);
            await this._repository.save(book);
        }catch(err){
            console.error("Terdapat error yang di temukan : "+err)
        }
    }

    async returnBook(code){
        try{
        const book= await this._repository.findByCode(code);
        if (!book) throw new Error("Buku Tidak ada");

        book.setStock(book.stock+1);
        await this._repository.save(book);
        }catch(err){
            console.error("tidak bisa melakukan returnBook() : "+err);
        }
    }

    async getAvailableBooks(){
        try{
        const books = await this._repository.getAvailableBooks();
        let availableBooks=books.map(book=>(
                {code : book.code,
                title : book.title,
                author : book.author,
                stock : book.stock}));
        return availableBooks;
        }catch(err){
            console.error("Tidak bisa melakukan getAvailableBook: "+err);
        }

    }
}

module.exports= new BookService(new BookRepositoryClass)