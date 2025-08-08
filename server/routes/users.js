// @ts-nocheck

import i18next from 'i18next';

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
    .get('/users/:id/edit', { name: 'updateUser' }, async (req, reply) => { // страница редактирования пользователя
      const { id } = req.params;
      const { user } = req;

      if (!req.isAuthenticated()) {
        req.flash('error', i18next.t('flash.authError'));
        reply.redirect(app.reverse('users'));
        return reply;
      }

      if (user.id !== Number(id)) {
        req.flash('error', i18next.t('flash.users.delete.authError'));
        reply.redirect(app.reverse('users'));
        return reply;
      }

      const userFind = await app.objection.models.user.query().findById(id);
      reply.render('users/edit', { user: userFind });
      return reply;
    })
    .delete('/users/:id', { name: 'deleteUser' }, async (req, reply) => {
      const { id } = req.params;
      const { user } = req;

      if (!req.isAuthenticated()) {
        req.flash('error', i18next.t('flash.authError'));
        reply.redirect(app.reverse('users'));
        return reply;
      }

      if (user.id !== Number(id)) {
        req.flash('error', i18next.t('flash.users.delete.authError'));
        reply.redirect(app.reverse('users'));
        return reply;
      }

      try {
        await app.objection.models.user.query().deletById(id);
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
