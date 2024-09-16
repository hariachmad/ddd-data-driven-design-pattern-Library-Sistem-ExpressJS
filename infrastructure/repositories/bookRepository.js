const Book = require('../../domain/entities/book');
const bookModel=require('../../domain/models/BookModel');
const {mapSequelizeBookToDomain}=require('../../domain/map/mapperBook');
const LoanRepository = require('../repositories/loanRepository');
const { Op } = require('sequelize');

class BookRepository{
    async findByCode(code){
        try {
            const book=await bookModel.findOne({
                where : { code : code}
            });

            if (book){
                console.log('buku ditemukan');
                if(!(mapSequelizeBookToDomain(book) instanceof Book)){
                    throw new Error("Instance dari buku tidak sesuai ");
                }
                return mapSequelizeBookToDomain(book);
            }else{
                console.log('buku tidak ditemukan');
            }

        }catch(err){
            console.error("error mencari buku: "+err);
        }
    }
    async save(book){
        let saveBook={
            code : book.code,
            title : book.title,
            author : book.author,
            stock : book.stock
        }

        try{
            await bookModel.upsert(saveBook);
            console.log("Data Berhasil di Save");
        }catch(err){
            console.error("Tidak dapat Save data book : ",err);
        }
    }

    async getAvailableBooks(){
        const loanBooks=new LoanRepository();
        const availableBooks=[];
        try{
        const availableBooksModel = await bookModel.findAll({
            where : {
                code : {
                    [Op.notIn]: await loanBooks.getLoanBooks()
                }
            }
        })
        availableBooksModel.forEach(element => {
            availableBooks.push(mapSequelizeBookToDomain(element));
        });
        return availableBooks;

        }catch(err){
            console.error("error saat mengambil available books: "+err)
        }
    }
}

module.exports=BookRepository;