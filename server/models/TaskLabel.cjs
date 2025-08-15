const BaseModel = require('./BaseModel.cjs');
// const Task = require('./Task.cjs');
// const Label = require('./Label.cjs')

module.exports = class TaskLabel extends BaseModel {
  static get tableName() {
    return 'task_labels';
  }

  static get idColumn() {
    return ['taskId', 'labelId']; // составной первичный ключ
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['taskId', 'labelId'],
      properties: {
        taskId: { type: 'integer' },
        labelId: { type: 'integer' },
      },
    };
  }
};
