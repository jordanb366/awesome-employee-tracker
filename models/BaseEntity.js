const connection = require("../config/dbConfig");

class BaseEntity {
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  findAll(table) {
    return this.dbConnection.query(`SELECT * FROM ??`, [table]);
  }

  findById(columns, table, id) {
    return this.dbConnection.query(`SELECT ?? FROM ?? WHERE id = ?`, [
      columns,
      table,
      id,
    ]);
  }

  create(obj) {}

  updateById(id) {}

  deleteById(id) {}
}
