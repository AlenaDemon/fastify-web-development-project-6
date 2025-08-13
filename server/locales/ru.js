// @ts-check

export default {
  translation: {
    appName: 'Менеджер задач',
    flash: {
      tasks: {
        create: {
          success: 'Задача успешно создана',
          error: 'Не удалось создать задачу',
        },
        delete: {
          error: 'Не удалось удалить задачу',
          success: 'Задача успешно удалена',
        },
        edit: {
          error: 'Не удалось изменить задачу',
          success: 'Задача успешно изменена',
        },
      },
      statuses: {
        create: {
          success: 'Статус успешно создан',
          error: 'Не удалось создать статус',
        },
        delete: {
          error: 'Не удалось удалить статус',
          success: 'Статус успешно удален',
        },
        edit: {
          error: 'Не удалось изменить статус',
          success: 'Статус успешно изменён',
        },
      },
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный емейл или пароль',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован',
        },
        edit: {
          error: 'Не удалось изменить пользователя',
          success: 'Пользователь успешно изменён',
        },
        delete: {
          error: 'Не удалось удалить пользователя',
          success: 'Пользователя успешно удален',
        },
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
    },
    layouts: {
      application: {
        statuses: 'Статусы',
        tasks: 'Задачи',
        users: 'Пользователи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
      },
    },
    views: {
      change: 'Изменить',
      delete: 'Удалить',
      session: {
        new: {
          signIn: 'Вход',
          submit: 'Войти',
        },
      },
      tasks: {
        description: 'Описание',
        tasks: 'Задачи',
        create: 'Создать задачу',
        id: 'ID',
        name: 'Наименование',
        createdAt: 'Дата создания',
        statusId: 'Статус',
        author: 'Автор',
        creatorId: 'Исполнитель',
        label: 'Метка',
        show: 'Показать',
        checkbox: 'Только мои задачи',
        new: {
          submit: 'Создать',
          create: 'Создание задачи',
        },
        edit: {
          edit: 'Изменение задачи',
          submit: 'Изменить',
        },
      },
      statuses: {
        statuses: 'Статусы',
        create: 'Создать статус',
        id: 'ID',
        name: 'Наименование',
        createdAt: 'Дата создания',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
          create: 'Создание статуса',
        },
        edit: {
          edit: 'Изменение статуса',
          submit: 'Изменить',
        },
      },
      users: {
        name: 'Наименование',
        users: 'Пользователи',
        id: 'ID',
        fullname: 'Полное имя',
        email: 'Email',
        actions: 'Действия',
        createdAt: 'Дата создания',
        password: 'Пароль',
        firstName: 'Имя',
        lastName: 'Фамилия',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
        },
        edit: {
          edit: 'Изменение пользователя',
          firstname: 'Имя',
          lastname: 'Фамилия',
          email: 'Email',
          password: 'Пароль',
          submit: 'Изменить',
        },
      },
      welcome: {
        index: {
          hello: 'Привет от Хекслета!',
          description: 'Практические курсы по программированию',
          more: 'Узнать Больше',
        },
      },
    },
  },
};
