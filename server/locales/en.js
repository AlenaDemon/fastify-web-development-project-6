// @ts-check

export default {
  translation: {
    appName: 'Task Manager',
    flash: {
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
        users: 'Users',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Login',
          submit: 'Login',
        },
      },
      users: {
        users: 'Users',
        id: 'ID',
        fullname: 'Full name',
        email: 'Email',
        createdAt: 'Created at',
        actions: 'Actions',
        password: 'Password',
        firstName: 'Name',
        lastName: 'Lastname',
        change: 'Change',
        delete: 'Delete',
        new: {
          submit: 'Register',
          signUp: 'Register',
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
