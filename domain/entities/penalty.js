class Penalty{
    constructor(memberCode,daysPenalty){
        this._memberCode=memberCode;
        this._daysPenalty=daysPenalty;
    }
    get memberCode(){
        return this._memberCode;
    }

    get daysPenalty(){
        return this._daysPenalty;
    }

    setDaysPenalty(day){
        this._daysPenalty=day;
    }
}

module.exports= Penalty;