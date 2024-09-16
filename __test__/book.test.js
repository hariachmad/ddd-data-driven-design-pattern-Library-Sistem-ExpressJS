const bookClass = require('../domain/entities/book')

test('should throw error if isAvailable is empty', () => {
    const member = new bookClass('JK-46', 'Hari Achmad','Perjalanan',1);
    expect(() => setAvailability(isAvailable) ).toThrow('isAvailable cannot be empty');
  });

  test('should throw error if qty is empty', () => {
    const member = new bookClass('JK-46', 'Hari Achmad','Perjalanan',1);
    expect(() => setStock(qty) ).toThrow('qty cannot be empty');
  });

