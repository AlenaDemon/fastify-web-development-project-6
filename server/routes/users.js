/* eslint-disable consistent-return */
// @ts-nocheck

import i18next from 'i18next';
import ensureAuthenticated from '../middleware/authenticate.js';

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (req, reply) => { // страница со списком всех пользователей
      const users = await app.objection.models.user.query();
      reply.render('users/index', { users });
      return reply;
    })
    .get('/users/new', { name: 'newUser' }, (req, reply) => { // страница регистрации
      const user = new app.objection.models.user();
      reply.render('users/new', { user });
    })
    .post('/users', async (req, reply) => { // создание пользователя
      const { data } = req.body;
      const user = new app.objection.models.user();
      user.$set(data);

      try {
        const validUser = await app.objection.models.user.fromJson(data);
        await app.objection.models.user.query().insert(validUser);
        req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect(app.reverse('root'));
        return reply;
      } catch (error) {
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user: data, errors: error.data });
        return reply;
      }
    })
    .get('/users/:id/edit', { name: 'updateUser', preHandler: ensureAuthenticated }, async (req, reply) => { // страница редактирования пользователя
      const { id } = req.params;
      const userFind = await app.objection.models.user.query().findById(id);
      reply.render('users/edit', { user: userFind });
      return reply;
    })
    .patch('/users/:id', { name: 'patchUser', preHandler: ensureAuthenticated }, async (req, reply) => { // обновление пользователя
      const { id } = req.params;
      const { data } = req.body;

      try {
        const patchForm = await app.objection.models.user.fromJson(data);
        const user = await app.objection.models.user.query().findById(id);

        await user.$query().patch(patchForm);

        req.flash('info', i18next.t('flash.users.edit.success'));
        reply.redirect('/users');
      } catch (error) {
        req.flash('error', i18next.t('flash.users.edit.error'));
        reply.render('users/edit', {
          user: { id, ...data },
          errors: error.data,
        });
        return reply;
      }
    })
    .delete('/users/:id', { name: 'deleteUser', preHandler: ensureAuthenticated }, async (req, reply) => { // удаление пользователя
      const { id } = req.params;

      // Проверяем, есть ли задачи, связанные с этим пользователем
      const tasksCount = await app.objection.models.task
        .query()
        .where('creatorId', id)
        .resultSize();

      if (tasksCount > 0) {
        req.flash('error', 'Невозможно удалить: пользователь связан с задачами');
        return reply.redirect(app.reverse('users'));
      }

      try {
        await app.objection.models.user.query().deleteById(id);
        req.logOut();
        req.flash('info', i18next.t('flash.users.delete.success'));
        reply.redirect(app.reverse('users'));
      } catch (error) {
        req.flash('error', i18next.t('flash.users.delete.error'));
        reply.redirect(app.reverse('users'));
      }

      return reply;
    });
};
