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
    .get('/statuses/:id/edit', { name: 'updateStatus' }, async (req, reply) => { // страница редактирования статуса
      const { id } = req.params;
      const statusFind = await app.objection.models.status.query().findById(id);
      reply.render('statuses/edit', { status: statusFind });
      return reply;
    })
    .post('/statuses', { name: 'statusNew' }, async (req, reply) => { // создание нового статуса
      const { data } = req.body;
      const status = new app.objection.models.status();
      status.$set(data);

      try {
        const validStatus = await app.objection.models.status.fromJson(data);
        await app.objection.models.status.query().insert(validStatus);
        req.flash('info', i18next.t('flash.statuses.create.success'));
        reply.redirect(app.reverse('statuses'));
        return reply;
      } catch (error) {
        req.flash('error', i18next.t('flash.statuses.create.error'));
        reply.render('statuses/new', { status: data, errors: error.data });
        return reply;
      }
    })
    .patch('/statuses/:id', { name: 'patchStatus' }, async (req, reply) => { // обновление статуса
      const { id } = req.params;
      const { data } = req.body;

      try {
        const patchForm = await app.objection.models.status.fromJson(data);
        const status = await app.objection.models.status.query().findById(id);

        await status.$query().patch(patchForm);

        req.flash('info', i18next.t('flash.statuses.edit.success'));
        reply.redirect('/statuses');
      } catch (error) {
        req.flash('error', i18next.t('flash.statuses.edit.error'));
        reply.render('statuses/edit', {
          status: { id, ...data },
          errors: error.data,
        });
        return reply;
      }
    })
    .delete('/statuses/:id', { name: 'deleteStatus' }, async (req, reply) => { // удаление статуса
      const { id } = req.params;

      const tasksCount = await app.objection.models.task
        .query()
        .where('statusId', id)
        .resultSize();

      if (tasksCount > 0) {
        req.flash('error', 'Невозможно удалить: статус используется в задачах');
        return reply.redirect(app.reverse('statuses'));
      }

      try {
        await app.objection.models.status.query().deleteById(id);
        req.logOut();
        req.flash('info', i18next.t('flash.statuses.delete.success'));
        reply.redirect(app.reverse('statuses'));
      } catch (error) {
        req.flash('error', i18next.t('flash.statuses.delete.error'));
        reply.redirect(app.reverse('statuses'));
      }

      return reply;
    });
};
