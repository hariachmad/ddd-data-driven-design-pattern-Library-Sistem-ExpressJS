const Book = require('../../domain/entities/book');

function mapSequelizeBookToDomain(sequelizeBook) {
  if (!sequelizeBook) {
    return null;
  }
  return new Book(
    sequelizeBook.code,
    sequelizeBook.title,
    sequelizeBook.author,
    sequelizeBook.stock,
  );
}

module.exports = {
  mapSequelizeBookToDomain
};