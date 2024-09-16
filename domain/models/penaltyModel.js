const DataTypes = require('sequelize');
const Sequelize = require('../../config/Db');

const penalty=Sequelize.define(
    'penalty',{
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        days :{
            type : DataTypes.INTEGER
        }
    },{
        timestamps:false
    }
)

const syncDB = async () => {
    try{
        await penalty.sync({alter:true});
        console.log("The table for penalty model was created");
    }catch(err){
        console.error('Unable to sync Database');
    }
}

module.exports = penalty;