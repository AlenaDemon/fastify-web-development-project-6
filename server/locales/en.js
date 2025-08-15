// @ts-check

export default {
  translation: {
    appName: 'Task Manager',
    flash: {
      tasks: {
        create: {
          success: 'Task created successfully',
          error: 'Failed to create task',
        },
        delete: {
          error: 'Failed to delete task',
          success: 'Task successfully deleted',
        },
        edit: {
          error: 'Failed to change task',
          success: 'The task was successfully modified',
        },
      },
      statuses: {
        create: {
          success: 'Status successfully created',
          error: 'Failed to create status',
        },
      },
      session: {
        create: {
          success: 'You are logged in',
          error: 'Wrong email or password',
        },
        delete: {
          success: 'You are logged out',
        },
      },
      users: {
        create: {
          error: 'Failed to register',
          success: 'User registered successfully',
        },
        edit: {
          error: 'Failed to edit',
          success: 'User edited successfully',
        },
        delete: {
          error: 'Failed to delete',
          success: 'User deleted successfully',
        },
      },
      authError: 'Access denied! Please login',
    },
    layouts: {
      application: {
        labels: 'Labels',
        tasks: 'Tasks',
        statuses: 'Statuses',
        users: 'Users',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
      },
    },
    views: {
      change: 'Change',
      delete: 'Delete',
      session: {
        new: {
          signIn: 'Login',
          submit: 'Login',
        },
      },
      tasks: {
        labels: 'Labels',
        description: 'Description',
        tasks: 'Tasks',
        create: 'Create task',
        id: 'ID',
        name: 'Name',
        createdAt: 'Created at',
        statusId: 'Status',
        author: 'Author',
        creatorId: 'Executor',
        label: 'Label',
        show: 'Show',
        checkbox: 'Only my tasks',
        new: {
          submit: 'Create',
          create: 'Create a task',
        },
        edit: {
          edit: 'Changing a task',
          submit: 'Change',
        },
      },
      statuses: {
        statuses: 'Statuses',
        create: 'Create status',
        id: 'ID',
        name: 'Name',
        createdAt: 'Created at',
        new: {
          submit: 'Register',
          signUp: 'Register',
        },
      },
      users: {
        name: 'Name',
        users: 'Users',
        id: 'ID',
        fullname: 'Full name',
        email: 'Email',
        createdAt: 'Created at',
        actions: 'Actions',
        password: 'Password',
        firstName: 'Name',
        lastName: 'Lastname',
        new: {
          submit: 'Register',
          signUp: 'Register',
          create: 'Creating a status',
        },
        edit: {
          title: 'Edit user',
          header: 'Edit user: ',
          submit: 'Update',
          cancel: 'Cancel',
          success: 'User successfully edited',
          error: 'User edit error',
          notAllowed: 'Not allowed for current user',
        },
      },
      welcome: {
        index: {
          hello: 'Hello from Hexlet!',
          description: 'Online programming school',
          more: 'Learn more',
        },
      },
    },
  },
};
