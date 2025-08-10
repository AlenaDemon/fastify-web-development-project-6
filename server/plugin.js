// @ts-check

import { fileURLToPath } from 'url';
import path from 'path'; // Импорт Node.js модулей для работы с путями и URL.
import fastifyStatic from '@fastify/static'; // Плагин для раздачи статических файлов в Fastify.
// NOTE: не поддердивает fastify 4.x
// import fastifyErrorPage from 'fastify-error-page';
import fastifyView from '@fastify/view'; // Плагин для работы с шаблонизаторами (Pug).
import fastifyFormbody from '@fastify/formbody'; // Плагин для парсинга данных форм.
import fastifySecureSession from '@fastify/secure-session'; // Плагин для безопасных сессий.
import fastifyPassport from '@fastify/passport'; // Интеграция Passport.js с Fastify для аутентификации.
import fastifySensible from '@fastify/sensible'; // Плагин с полезными утилитами для Fastify.
import { plugin as fastifyReverseRoutes } from 'fastify-reverse-routes'; // Плагин для генерации URL по имени маршрута.
import fastifyMethodOverride from 'fastify-method-override'; // Плагин для поддержки HTTP-методов кроме GET/POST.
import fastifyObjectionjs from 'fastify-objectionjs'; // Интеграция ORM Objection.js с Fastify.
import qs from 'qs'; // Библиотека для парсинга query-строк.
import Pug from 'pug'; // Шаблонизатор Pug.
import i18next from 'i18next'; // Библиотека интернационализации.
import dotenv from 'dotenv';
import ru from './locales/ru.js';
import en from './locales/en.js';
import addRoutes from './routes/index.js'; // Импорт маршрутов.
import getHelpers from './helpers/index.js'; // Вспомогательные функции для шаблонов.
import * as knexConfig from '../knexfile.js'; // Конфигурация Knex (для работы с базой данных).
import models from './models/index.js';
import FormStrategy from './lib/passportStrategies/FormStrategy.js'; // Кастомная стратегия аутентификации Passport.

const __dirname = fileURLToPath(path.dirname(import.meta.url));

const mode = process.env.NODE_ENV || 'development';
const isDevelopment = mode === 'development';

const setUpViews = (app) => {
  const route = (name, placeholdersValues) => app.reverse(name, placeholdersValues);
  const helpers = getHelpers(app);
  app.register(fastifyView, {
    engine: {
      pug: Pug,
    },
    includeViewExtension: true,
    defaultContext: {
      ...helpers,
      route,
      assetPath: (filename) => `/assets/${filename}`,
    },
    templates: path.join(__dirname, '..', 'server', 'views'),
  });

  app.decorateReply('render', function render(viewPath, locals) {
    this.view(viewPath, { ...locals, reply: this });
  });
};

const setUpStaticAssets = (app) => {
  app.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'dist'),
    prefix: '/assets/',
  });
  // Для изображений
  app.register(fastifyStatic, {
    root: path.join(__dirname, 'images'),
    prefix: '/images/',
    decorateReply: false, // Важно для нескольких статических папок
  });
};

const setupLocalization = async () => {
  await i18next
    .init({
      lng: 'ru',
      fallbackLng: 'ru',
      // debug: isDevelopment,
      resources: {
        ru,
        en,
      },
    });
};

const registerPlugins = async (app) => {
  await app.register(fastifySensible);
  // await app.register(fastifyErrorPage);
  await app.register(fastifyReverseRoutes);
  await app.register(fastifyFormbody, { parser: qs.parse });
  await app.register(fastifySecureSession, {
    secret: process.env.SESSION_KEY,
    cookie: {
      path: '/',
    },
  });

  // Создаём экземпляр Authenticator
  const passport = new fastifyPassport.Authenticator();

  // Регистрируем сериализатор / десериализатор пользователя
  passport.registerUserSerializer((user) => user.id);
  passport.registerUserDeserializer(async (id) => {
    console.log('[DESERIALIZER] got id:', id);
    const user = await app.objection.models.user.query().findById(id);
    console.log('[DESERIALIZER] found user:', user);
    return user || null;
  });

  // Регистрируем стратегию аутентификации
  passport.use(new FormStrategy('form', app));

  // Регистрируем плагины fastifyPassport
  await app.register(passport.initialize());
  await app.register(passport.secureSession());

  // Декорируем экземпляр passport в app для использования в роутинге
  app.decorate('fp', passport);

  // Хелпер для аутентификации
  app.decorate('authenticate', (...args) => passport.authenticate('form', {
    failureRedirect: app.reverse('root'),
    failureFlash: i18next.t('flash.authError'),
  })(...args));

  await app.register(fastifyMethodOverride);
  await app.register(fastifyObjectionjs, {
    knexConfig: knexConfig[mode],
    models,
  });
};

export const options = {
  exposeHeadRoutes: false,
};

const addHooks = (app) => {
  app.addHook('preHandler', async (req, reply) => {
    reply.locals = {
      isAuthenticated: () => req.isAuthenticated(),
    };
  });
};

// eslint-disable-next-line no-unused-vars
export default async (app, _options) => {
  await registerPlugins(app);

  await setupLocalization();
  setUpViews(app);
  setUpStaticAssets(app);
  addRoutes(app);
  addHooks(app);

  return app;
};
