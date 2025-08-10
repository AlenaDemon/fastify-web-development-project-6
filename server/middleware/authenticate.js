import i18next from 'i18next';

export default (req, reply, done) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    // Пользователь авторизован, продолжаем обработку
    done();
  } else {
    // Не авторизован — редиректим на страницу входа и показываем flash сообщение
    req.flash('error', i18next.t('flash.authError'));
    reply.redirect('/').send();
  }
};
