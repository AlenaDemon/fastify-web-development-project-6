// @ts-check

import i18next from 'i18next';
import userSchema from '../validators/userValidator.js';

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
      user.password = data.password;

      try {
        const validUser = await userSchema.validate(data, { abortEarly: false });
        await app.objection.models.user.query().insert(validUser);
        req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect(app.reverse('root'));
        return reply;
      } catch (error) {
        const errors = {};

        if (error.name === 'ValidationError') {
          error.inner.forEach((err) => {
            if (!errors[err.path]) {
              errors[err.path] = [];
            }

            errors[err.path].push({ message: err.message });
          });
        }
        console.error(':),Ошибка регистрации пользователя:', error);
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user: data, errors });
        return reply;
      }
    });
};
