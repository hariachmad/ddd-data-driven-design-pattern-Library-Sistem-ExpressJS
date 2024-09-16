class Member{
    constructor(code,name){
        this._code=code;
        this._name=name;
        this._currentLoans=[];
        this._numberOfCurrentLoans=null;
        this._dayPenalties=0;
        this._isPenalized=this._dayPenalties>0;
    }

    get code(){
        return this._code;
    }
    get name(){
        return this._name;
    }

    get currentLoans(){
        return this._currentLoans;
    }

    get dayPenalties(){
        return this._dayPenalties;
    }

    get numberOfCurrentLoans(){
        return this._numberOfCurrentLoans;
    }

    get isPenalized(){
        return this._isPenalized;
    }

    setNumberOfCurrentLoans(number){
        if (!number) throw new Error('Number cannot be empty');
        this._numberOfCurrentLoans=number;
    }

    setCurrentLoans(books){
        if (!books) throw new Error('Books cannot be empty');
        this._currentLoans=books;
        this.setNumberOfCurrentLoans(books.length());
    }

    setDayPenalties(day){
        if (!day) throw new Error('Day cannot be empty');
        this._dayPenalties=day;
    }
}

module.exports = Member;