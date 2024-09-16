const DataTypes = require('sequelize');
const Sequelize =require('../../config/Db');
const bookModel = require('../models/BookModel');
const memberModel = require('../models/memberModel');

const loan= Sequelize.define(
    'loan',{
        loanDate:{
            type: DataTypes.DATEONLY,
            allowNull:true
        },
        returnDueDate: {
            type: DataTypes.DATEONLY,
            allowNull:true
        },
        returnDate: {
            type: DataTypes.DATEONLY,
            allowNull:true
        }
    },{
        timestamps:false
    }
)

loan.belongsTo(bookModel);
loan.belongsTo(memberModel);

const syncDB = async () => {
    try{
        await loan.sync({alter:true});
        console.log("The table for Member model was created");
    }catch(err){
        console.error('Unable to sync Database');
    }
}

module.exports = loan;