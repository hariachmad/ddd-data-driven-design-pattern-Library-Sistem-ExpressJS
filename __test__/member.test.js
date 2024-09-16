const MemberClass = require('../domain/entities/Member')

test('should throw error if number is empty', () => {
  const member = new MemberClass('M009', 'Hari');
  expect(() => member.setNumberOfCurrentLoans(number)).toThrow('Number cannot be empty');
});

test('should throw error if Books is empty', () => {
  const member = new MemberClass('M009', 'Hari');
  expect(() => member.setCurrentLoans(books)).toThrow('Books cannot be empty');
});

test('should throw error if Day is empty', () => {
  const member = new MemberClass('M009', 'Hari');
  expect(() => member.setDayPenalties(day)).toThrow('Day cannot be empty');
});