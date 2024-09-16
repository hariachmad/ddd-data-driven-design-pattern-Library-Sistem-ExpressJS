const Member = require('../entities/Member');

function mapSequelizeMemberToDomain(sequelizeMember){
    if(!sequelizeMember){
        return null;
    }
    return new Member(
        sequelizeMember.code,
        sequelizeMember.name
    )
}

module.exports = {mapSequelizeMemberToDomain};