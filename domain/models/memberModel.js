const DataTypes = require('sequelize');
const Sequelize = require('../../config/Db');

const member=Sequelize.define(
    'member',{
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        name :{
            type : DataTypes.STRING
        }
    },{
        timestamps:false
    }
)

const syncDB = async () => {
    try{
        await member.sync({alter:true});
        console.log("The table for Member model was created");
    }catch(err){
        console.error('Unable to sync Database');
    }
}


module.exports = member;