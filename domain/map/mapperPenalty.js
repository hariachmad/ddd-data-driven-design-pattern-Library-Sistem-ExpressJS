const Penalty = require('../../domain/entities/penalty');

function mapSequelizePenaltyToDomain(sequelizePenalty) {
  if (!sequelizePenalty) {
    return null;
  }
  console.log("sequelizePenalty Day: "+sequelizePenalty.days);
  const penalty = new Penalty(
    sequelizePenalty.code,
    sequelizePenalty.days
  );
  console.log("penalty.days : "+penalty.days);
  return penalty;
}

module.exports = {
  mapSequelizePenaltyToDomain
};