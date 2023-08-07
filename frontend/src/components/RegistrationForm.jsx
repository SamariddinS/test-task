// src/components/RegistrationForm.js

import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    sureName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    birthday: Yup.string().required('Required'),
    passportNumber: Yup.string().required('Required'),
    phone: Yup.string().required('Required'),
    secondPhone: Yup.string().required('Required'),
    nationality: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    region: Yup.string().required('Required'),
    district: Yup.string().required('Required'),
    street: Yup.string().required('Required'),
    homeNumber: Yup.string().required('Required'),
    registrationRegion: Yup.string().required('Required'),
    education: Yup.string().required('Required'),
    speciality: Yup.string().required('Required'),
    maritalStatus: Yup.boolean(),
    numberOfChild: Yup.number().required('Required'),
    motherFullname: Yup.string().required('Required'),
    matherWorkPlace: Yup.string(),
    fatherFullname: Yup.string().required('Required'),
    fatherWorkPlace: Yup.string(),
    tosAgreement: Yup.boolean().oneOf([true], 'You must accept the Terms of Service'),
});

const initialValues = {
    firstName: '',
    sureName: '',
    lastName: '',
    birthday: '',
    passportNumber: '',
    phone: '',
    secondPhone: '',
    nationality: '',
    country: '',
    region: '',
    district: '',
    street: '',
    homeNumber: '',
    registrationRegion: '',
    education: '',
    speciality: '',
    maritalStatus: false,
    numberOfChild: 0,
    motherFullname: '',
    matherWorkPlace: '',
    fatherFullname: '',
    fatherWorkPlace: '',
    tosAgreement: false,
};

const RegistrationForm = () => {
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            // Отправка данных на сервер
            await axios.post('http://localhost:3000/employee', values);
            console.log('Данные успешно отправлены:', values);
        } catch (error) {
            console.error('Произошла ошибка при отправке данных:', error);
        }

        setSubmitting(false);
    };

    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-white border rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Форма регистрации</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-4">
                            <label htmlFor="firstName" className="block font-medium mb-1">
                                Имя:
                            </label>
                            <Field
                                type="text"
                                name="firstName"
                                className="w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="firstName" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="sureName" className="block font-medium mb-1">
                                Фамилия:
                            </label>
                            <Field
                                type="text"
                                name="sureName"
                                className="w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="sureName" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="block font-medium mb-1">
                                Отчество:
                            </label>
                            <Field
                                type="text"
                                name="lastName"
                                className="w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="lastName" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="birthday" className="block font-medium mb-1">
                                День рождение:
                            </label>
                            <Field
                                type="text"
                                name="birthday"
                                className="w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="birthday" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="passportNumber" className="block font-medium mb-1">
                                Номер паспорта:
                            </label>
                            <Field
                                type="text"
                                name="passportNumber"
                                className="w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="passportNumber" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block font-medium mb-1">
                                Телефон:
                            </label>
                            <Field
                                type="text"
                                name="phone"
                                className="w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="phone" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="secondPhone" className="block font-medium mb-1">
                                Доп. Тел:
                            </label>
                            <Field
                                type="text"
                                name="secondPhone"
                                className="w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="secondPhone" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nationality" className="block font-medium mb-1">
                                Национальность:
                            </label>
                            <Field
                                type="text"
                                name="nationality"
                                className="w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="nationality" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="country" className="block font-medium mb-1">
                                Страна:
                            </label>
                            <Field
                                type="text"
                                name="country"
                                className="w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="country" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="region" className="block font-medium mb-1">
                                Область:
                            </label>
                            <Field
                                type="text"
                                name="region"
                                className="w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="region" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="district" className="block font-medium mb-1">
                                Раён:
                            </label>
                            <Field
                                type="text"
                                name="district"
                                className="w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="district" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="street" className="block font-medium mb-1">
                                Улица:
                            </label>
                            <Field
                                type="text"
                                name="street"
                                className="w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="street" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="homeNumber" className="block font-medium mb-1">
                                Дом:
                            </label>
                            <Field
                                type="text"
                                name="homeNumber"
                                className="w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="homeNumber" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="registrationRegion" className="block font-medium mb-1">
                                Место прописки:
                            </label>
                            <Field
                                type="text"
                                name="registrationRegion"
                                className="w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="registrationRegion" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="education" className="block font-medium mb-1">
                                Образование:
                            </label>
                            <Field
                                type="text"
                                name="education"
                                className="w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="education" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="speciality" className="block font-medium mb-1">
                                Специальность:
                            </label>
                            <Field
                                type="text"
                                name="speciality"
                                className="w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="speciality" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="maritalStatus" className="flex items-center">
                                Семейное положение:
                            </label>
                            <Field
                                type="checkbox"
                                name="maritalStatus"
                                className="w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="maritalStatus" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="numberOfChild" className="block font-medium mb-1">
                                Кол. детей:
                            </label>
                            <Field
                                type="number"
                                name="numberOfChild"
                                className="w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="numberOfChild" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="motherFullname" className="block font-medium mb-1">
                                Полное имя Матери:
                            </label>
                            <Field
                                type="text"
                                name="motherFullname"
                                className="w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="motherFullname" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="matherWorkPlace" className="block font-medium mb-1">
                                Место работы Матери:
                            </label>
                            <Field
                                type="text"
                                name="matherWorkPlace"
                                className="w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="matherWorkPlace" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="fatherFullname" className="block font-medium mb-1">
                                Полное имя Отца:
                            </label>
                            <Field
                                type="text"
                                name="fatherFullname"
                                className="w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="fatherFullname" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="fatherWorkPlace" className="block font-medium mb-1">
                                Место работы Отца:
                            </label>
                            <Field
                                type="text"
                                name="fatherWorkPlace"
                                className="w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="fatherWorkPlace" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="tosAgreement" className="flex items-center">
                                <Field
                                    type="checkbox"
                                    name="tosAgreement"
                                    className="mr-2"
                                />
                                Я согласен с обработкой персональных данных
                            </label>
                            <ErrorMessage name="tosAgreement" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600"
                            >
                                Представлять на рассмотрение
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegistrationForm;
