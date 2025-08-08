// @ts-check

const objectionUnique = require('objection-unique');
const BaseModel = require('./BaseModel.cjs');
const encrypt = require('../lib/secure.cjs');

const unique = objectionUnique({ fields: ['email'] });

module.exports = class User extends unique(BaseModel) {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstName', 'lastName', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        firstName: { type: 'string', minLength: 1 },
        lastName: { type: 'string', minLength: 1 },
        email: { type: 'string', minLength: 1 },
        password: { type: 'string', minLength: 3 },
      },
    };
  }

  set password(value) {
    this.passwordDigest = encrypt(value);
  }

  verifyPassword(password) {
    return encrypt(password) === this.passwordDigest;
  }

  async $beforeInsert() {
    this.firstName = this.firstName.trim();
    this.lastName = this.lastName.trim();
    this.email = this.email.toLowerCase();
  }

  $formatDatabaseJson(json) {
    const data = super.$formatDatabaseJson(json);
    data.first_name = data.firstName;
    data.last_name = data.lastName;
    delete data.firstName;
    delete data.lastName;
    return data;
  }

  $parseDatabaseJson(json) {
    const data = super.$parseDatabaseJson(json);
    data.firstName = json.first_name;
    data.lastName = json.last_name;
    return data;
  }
};
