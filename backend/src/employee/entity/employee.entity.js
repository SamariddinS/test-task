//  ***   Employee Entity    ***

import { boolean, minLength, number, object, safeParse, string, union } from 'valibot';
import { employeeRepository } from '../repository/employee.repository.js';


// Define all the handlers
export const employee = {};

employee.create = async (data) => {
    const employeeSchema = object({
        firstName: string('Укажите Имя', [minLength(3, 'Минимальная длина - 3 символа')]),

        sureName: string('Фамилия', [minLength(3, 'Минимальная длина - 3 символа')]),

        lastName: string('Отчество', [minLength(3, 'Минимальная длина - 3 символа')]),

        birthday: string('Дата рождения', [minLength(3, 'Минимальная длина - 3 символа')]),

        passportNumber: string('Номер паспорта', [minLength(9, 'Минимальная длина - 9 символов')]),

        phone: union([string('Телефон', [minLength(12, 'Минимальная длина - 12 символов')]), number()]),

        nationality: string('Национальность', [minLength(5, 'Минимальная длина - 5 символов')]),

        country: string('Страна', [minLength(5, 'Минимальная длина - 5 символов')]),

        region: string('Регион', [minLength(5, 'Минимальная длина - 5 символов')]),

        district: string('Район', [minLength(5, 'Минимальная длина - 5 символов')]),

        street: string('Улица', [minLength(5, 'Минимальная длина - 5 символов')]),

        homeNumber: union([string('Номер дома', [minLength(1, 'Минимальная длина - 1 символ')]), number()]),

        registrationRegion: string('Регион регистрации', [minLength(5, 'Минимальная длина - 5 символов')]),

        education: string('Образование'),

        speciality: string('Специальность', [minLength(5, 'Минимальная длина - 5 символов')]),

        maritalStatus: string('Семейное положение'),

        numberOfChild: number('Количество детей'),

        motherFullname: string('ФИО матери', [minLength(9, 'Минимальная длина - 9 символов')]),

        matherWorkPlace: string('Место работы матери', [minLength(9, 'Минимальная длина - 9 символов')]),

        fatherFullname: string('ФИО отца', [minLength(9, 'Минимальная длина - 9 символов')]),

        fatherWorkPlace: string('Место работы отца', [minLength(9, 'Минимальная длина - 9 символов')]),

        tosAgreement: boolean('Согласие с правилами использования (Правила пользовательского соглашения)'),
    });

    console.log('Data', data);
    var isSchemaValid = safeParse(employeeSchema, data).success

    const educationId = await employeeRepository.getSelectableValueId('education_degrees', 'education_degree', data.education);
    const maritalStatusId = await employeeRepository.getSelectableValueId('marital_statuses', 'status_name', data.maritalStatus);
    console.log(isSchemaValid);
    if (isSchemaValid) {
        // Make sure the user doesnt already exist
        const isExist = await employee.read({ 'passportNumber': data.passportNumber, })

        if (isExist.payload.searchResults[0]) {
            return { statusCode: 400, payload: { 'Error': 'Пользователь с таким номером паспорта уже существует' } };
        }

        const employeeObject = {
            'firstName': data.firstName,
            'sureName': data.sureName,
            'lastName': data.lastName,
            'birthday': data.birthday,
            'passportNumber': data.passportNumber,
            'phone': data.phone,
            'secondPhone': data.secondPhone,
            'nationality': data.nationality,
            'educationId': educationId,
            'speciality': data.speciality,
            'maritalStatusId': maritalStatusId,
            'numberOfChild': data.numberOfChild,
            'motherFullname': data.motherFullname,
            'matherWorkPlace': data.matherWorkPlace,
            'fatherFullname': data.fatherFullname,
            'fatherWorkPlace': data.fatherWorkPlace,
            'tosAgreement': true
        };

        const employeeAddress = {
            'country': data.country,
            'region': data.region,
            'district': data.district,
            'street': data.street,
            'homeNumber': data.homeNumber,
            'registrationRegion': data.registrationRegion,
        }

        const result = await employeeRepository.save(employeeObject, employeeAddress)

        if (result) {
            return { statusCode: 201, payload: { 'Success': '' } };
        }
    } else {
        return { statusCode: 400, payload: { 'Error': 'Отсутствуют обязательные поля' } };
    }
}

employee.read = async (data) => {
    try {
        const searchResults = await employeeRepository.searchEmployees(data);

        return { statusCode: 200, payload: { searchResults } }
    } catch (error) {
        return { statusCode: 400, payload: { error } }
    }

}

employee.update = async (data) => {
    try {
        const rowsUpdated = await employeeRepository.update(data.passportNumber, data);
        return { statusCode: 200, payload: { rowsUpdated } }
    } catch (error) {
        return { statusCode: 400, payload: { error } }
    }

}

employee.delete = async (data) => {
    try {
        const rowsDeleted = await employeeRepository.delete(data.passportNumber);
        return { statusCode: 200, payload: { rowsDeleted } };
    } catch (error) {
        return { statusCode: 400, payload: { 'Произошла ошибка при удалении данных:': error } };
    }
}
