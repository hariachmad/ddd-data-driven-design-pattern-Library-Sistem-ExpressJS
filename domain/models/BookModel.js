const DataTypes = require('sequelize');
const Sequelize =require('../../config/Db');

const book=Sequelize.define(
    'book',{
        code : {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        title : {
            type : DataTypes.STRING
        },
        author : {
            type : DataTypes.STRING
        },
        stock : {
            type : DataTypes.INTEGER
        }
    },
    {
        timestamps:false
    }
)

console.log(book === Sequelize.models.book); //True

const syncDB =async () => {
    try {
        await book.sync({alter: true});
        console.log('The table for the User model was just (re)created!');
    }catch(error){
        console.error('Unable to sync Database', error);
    }
}
const dropTable=async ()=> {
    try{
        await User.drop();
    }catch(error){
        console.error('Unable to drop Table :', error);
    }
}

module.exports=book;
