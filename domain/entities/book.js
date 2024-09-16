class Book{
    constructor(code,title,author,stock){
        this._code=code;
        this._title=title;
        this._author=author;
        this._stock=stock;
        this._isAvailable= stock > 0;
    }

    get code(){
        return this._code;
    }

    get title(){
        return this._title;
    }

    get author(){
        return this._author;
    }

    get stock(){
        return this._stock;
    }

    get isAvailable(){
        return this._isAvailable;
    }

    setAvailability(isAvailable) {
        this._isAvailable = isAvailable;
      }
    
    setStock(qty){
        this._stock=qty;
        if (qty==0){
            this.setAvailability(false);
        }
        this.setAvailability(true);
    }
}
module.exports=Book;
