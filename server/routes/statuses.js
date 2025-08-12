/* eslint-disable consistent-return */
// @ts-nocheck

import i18next from 'i18next';

export default (app) => {
  app
    .get('/statuses', { name: 'statuses' }, async (req, reply) => { // страница со списком всех статусов
      const statuses = await app.objection.models.status.query();
      reply.render('statuses/index', { statuses });
      return reply;
    })
    .get('/statuses/new', (req, reply) => { // страница создания статуса
      const status = new app.objection.models.status();
      reply.render('statuses/new', { status });
    })
    .get('/statuses/:id/edit', (req, reply) => { // страница редактирования статуса

    })
    .post('/statuses', { name: 'statusNew' }, async (req, reply) => { // создание нового статуса
      const { data } = req.body;
      const status = new app.objection.models.status();
      status.$set(data);
      app.log.info('POST with data:', req.body);

      try {
        const validStatus = await app.objection.models.status.fromJson(data);
        await app.objection.models.status.query().insert(validStatus);
        req.flash('info', i18next.t('flash.statuses.create.success'));
        reply.redirect(app.reverse('statuses'));
        return reply;
      } catch (error) {
        app.log.info('Error:', error.message);
        req.flash('error', i18next.t('flash.statuses.create.error'));
        reply.render('statuses/new', { status: data, errors: error.data });
        return reply;
      }
    })
    .patch('/statuses/:id', (req, reply) => { // обновление статуса

    })
    .delete('/statuses/:id', (req, reply) => { // удаление статуса

    });
};
