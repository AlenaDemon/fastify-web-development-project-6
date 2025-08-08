import * as yup from 'yup';

const userSchema = yup.object({
  firstName: yup.string().min(1, 'Минимум 1 символ').required(),
  lastName: yup.string().min(1, 'Минимум 1 символ').required(),
  email: yup.string().email('Некорректный email').required(),
  password: yup.string().min(3, 'Пароль должен быть не менее 3 символов').required(),
});

export default userSchema;
