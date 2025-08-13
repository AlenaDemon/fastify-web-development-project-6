/* eslint-disable consistent-return */
// @ts-nocheck

import i18next from 'i18next';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks' }, async (req, reply) => { // страница со списком всех задач
      const tasks = await app.objection.models.task.query();
      const statuses = await app.objection.models.status.query();
      const users = await app.objection.models.user.query();
      reply.render('tasks/index', {
        tasks,
        statuses: statuses.map((s) => ({ value: s.id, label: s.name })),
        users: users.map((u) => ({ value: u.id, label: `${u.firstName} ${u.lastName}` })),
      });
      return reply;
    })
    .get('/tasks/new', async (req, reply) => { // страница создания задачи
      const task = new app.objection.models.task();
      const statuses = await app.objection.models.status.query();
      const users = await app.objection.models.user.query();
      reply.render('tasks/new', {
        task,
        statuses: statuses.map((s) => ({ value: s.id, label: s.name })),
        users: users.map((u) => ({ value: u.id, label: `${u.firstName} ${u.lastName}` })),
      });
      return reply;
    })
    .get('/tasks/:id', { name: 'updateTasks' }, async (req, reply) => { // страница просмотра задачи
      const { id } = req.params;
      const task = await app.objection.models.task.query().findById(id);
      reply.render('tasks/edit', { task });
      return reply;
    })
    .get('/tasks/:id/edit', { name: 'updateTask' }, async (req, reply) => { // страница редактирования задачи
      const { id } = req.params;
      const task = await app.objection.models.task.query().findById(id);
      const statuses = await app.objection.models.status.query();
      const users = await app.objection.models.user.query();
      reply.render('tasks/edit', {
        task,
        statuses: statuses.map((s) => ({ value: s.id, label: s.name })),
        users: users.map((u) => ({ value: u.id, label: `${u.firstName} ${u.lastName}` })),
      });
      return reply;
    })
    .post('/tasks', { name: 'taskNew' }, async (req, reply) => { // создание новой задачи
      const { data } = req.body;
      data.statusId = Number(data.statusId);
      data.creatorId = Number(data.creatorId);
      const task = new app.objection.models.task();
      const statuses = await app.objection.models.status.query();
      const users = await app.objection.models.user.query();
      task.$set(data);

      try {
        const validTask = await app.objection.models.task.fromJson(data);
        await app.objection.models.task.query().insert(validTask);
        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('tasks'));
        return reply;
      } catch (error) {
        req.flash('error', i18next.t('flash.tasks.create.error'));
        reply.render('tasks/new', {
          task: data,
          errors: error.data,
          statuses: statuses.map((s) => ({ value: s.id, label: s.name })),
          users: users.map((u) => ({ value: u.id, label: `${u.firstName} ${u.lastName}` })),
        });
        return reply;
      }
    })
    .patch('/tasks/:id', { name: 'patchTask' }, async (req, reply) => { // обновление задачи
      const { id } = req.params;
      const { data } = req.body;
      data.statusId = Number(data.statusId);
      data.creatorId = Number(data.creatorId);
      const statuses = await app.objection.models.status.query();
      const users = await app.objection.models.user.query();
      try {
        const patchForm = await app.objection.models.task.fromJson(data);
        const task = await app.objection.models.task.query().findById(id);

        await task.$query().patch(patchForm);

        req.flash('info', i18next.t('flash.tasks.edit.success'));
        reply.redirect('/tasks');
      } catch (error) {
        req.flash('error', i18next.t('flash.tasks.edit.error'));
        reply.render('tasks/edit', {
          task: { id, ...data },
          errors: error.data,
          statuses: statuses.map((s) => ({ value: s.id, label: s.name })),
          users: users.map((u) => ({ value: u.id, label: `${u.firstName} ${u.lastName}` })),
        });
        return reply;
      }
    })
    .delete('/tasks/:id', { name: 'deleteTask' }, async (req, reply) => { // удаление задачи
      const { id } = req.params;
      const task = await app.objection.models.task.query().findById(id);
      console.log(task);
      try {
        await app.objection.models.task.query().deleteById(id);
        req.logOut();
        req.flash('info', i18next.t('flash.tasks.delete.success'));
        reply.redirect(app.reverse('tasks'));
      } catch (error) {
        req.flash('error', i18next.t('flash.tasks.delete.error'));
        reply.redirect(app.reverse('tasks'));
      }

      return reply;
    });
};
