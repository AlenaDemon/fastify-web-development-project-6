/* eslint-disable consistent-return */
// @ts-nocheck

import i18next from 'i18next';

export default (app) => {
  app
    .get('/labels', { name: 'labels' }, async (req, reply) => { // страница со списком всех статусов
      const labels = await app.objection.models.label.query();
      reply.render('labels/index', { labels });
      return reply;
    })
    .get('/labels/new', (req, reply) => { // страница создания статуса
      const label = new app.objection.models.label();
      reply.render('labels/new', { label });
    })
    .get('/labels/:id/edit', { name: 'updateLabel' }, async (req, reply) => { // страница редактирования статуса
      const { id } = req.params;
      const labelFind = await app.objection.models.label.query().findById(id);
      reply.render('labels/edit', { label: labelFind });
      return reply;
    })
    .post('/labels', { name: 'labelNew' }, async (req, reply) => { // создание нового статуса
      const { data } = req.body;
      const label = new app.objection.models.label();
      label.$set(data);

      try {
        const validLabel = await app.objection.models.label.fromJson(data);
        await app.objection.models.label.query().insert(validLabel);
        req.flash('info', i18next.t('flash.labels.create.success'));
        reply.redirect(app.reverse('labels'));
        return reply;
      } catch (error) {
        req.flash('error', i18next.t('flash.labels.create.error'));
        reply.render('labels/new', { label: data, errors: error.data });
        return reply;
      }
    })
    .patch('/labels/:id', { name: 'patchLabel' }, async (req, reply) => { // обновление статуса
      const { id } = req.params;
      const { data } = req.body;

      try {
        const patchForm = await app.objection.models.label.fromJson(data);
        const label = await app.objection.models.label.query().findById(id);

        await label.$query().patch(patchForm);

        req.flash('info', i18next.t('flash.labels.edit.success'));
        reply.redirect('/labels');
      } catch (error) {
        req.flash('error', i18next.t('flash.labels.edit.error'));
        reply.render('labels/edit', {
          label: { id, ...data },
          errors: error.data,
        });
        return reply;
      }
    })
    .delete('/labels/:id', { name: 'deleteLabel' }, async (req, reply) => { // удаление статуса
      const { id } = req.params;

      try {
        const label = await app.objection.models.label.query().findById(id);
        if (!label) {
          req.flash('error', 'Метка не найдена');
          return reply.redirect(app.reverse('labels'));
        }

        const tasks = await label.$relatedQuery('tasks').count('name', { as: 'count' }).then(([data]) => data.count);
        if (tasks > 0) {
          req.flash('error', 'Невозможно удалить: метка используется в задачах');
          return reply.redirect(app.reverse('labels'));
        }
        await label.$query().delete();
        req.flash('info', i18next.t('flash.labels.delete.success'));
        reply.redirect(app.reverse('labels'));
      } catch (error) {
        console.log('Не удалось удалить метку:', error);
        req.flash('error', i18next.t('flash.labels.delete.error'));
        reply.redirect(app.reverse('labels'));
      }

      return reply;
    });
};
