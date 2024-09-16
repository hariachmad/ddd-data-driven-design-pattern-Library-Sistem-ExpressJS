const PenaltyClass = require('../domain/entities/penalty')

test('should throw error if Day is empty', () => {
    const penalty = new PenaltyClass('M009', 3);
    expect(() => member.setDaysPenalty(day)).toThrow('Day cannot be empty');
  });