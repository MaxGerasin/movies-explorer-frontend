import { object, string } from 'yup';

const queryFilmsSchema = object().shape({
  queryFilms: string().required('Нужно ввести ключевое слово'),
});

const registerSchema = object().shape({
  name: string()
    .required('Обязательное поле')
    .matches(/^[\p{L}\s-]+$/u, 'Поле name содержит только латиницу, кириллицу, пробел или дефис'),
  email: string()
    .required('Обязательное поле')
    .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Неправильный формат'),
  password: string().required('Обязательное поле'),
});

const loginSchema = object().shape({
  email: string()
    .required('Обязательное поле')
    .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Неправильный формат'),
  password: string().required('Обязательное поле'),
});

const profileSchema = object().shape({
  name: string()
    .required('Обязательное поле')
    .matches(/^[\p{L}\s-]+$/u, 'Поле name содержит только латиницу, кириллицу, пробел или дефис'),
  email: string()
    .required('Введите новый Email или нажмите редактировать')
    .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Неправильный формат'),
});

export { queryFilmsSchema, registerSchema, loginSchema, profileSchema };
