//  ***   Employee Entity    ***

import { employeeRepository } from '../repository/employee.repository.js';

// Check that all required fields are filled out
function validateField(payload, field, type, minLength = 2, exactLength = null) {
    const value = payload[field];
    if (typeof value === 'undefined' || value === null) {
        return false;
    }

    if (typeof type === 'boolean') {
        return typeof value === 'boolean';
    }

    if (typeof value === type && value.toString().trim().length >= minLength) {
        if (exactLength !== null && value.toString().trim().length !== exactLength) {
            return false;
        }
        return value.toString().trim();
    }
    return false;
}

// Define all the handlers
export const employee = {};

employee.create = async (data) => {
    const firstName = validateField(data, 'firstName', 'string');
    const sureName = validateField(data, 'sureName', 'string');
    const lastName = validateField(data, 'lastName', 'string');
    const birthday = validateField(data, 'birthday', 'string');
    const passportNumber = validateField(data, 'passportNumber', 'string', 9, 9);
    const phone = validateField(data, 'phone', 'string', 12, 12);
    const secondPhone = validateField(data, 'secondPhone', 'string', 12, 12);
    const nationality = validateField(data, 'nationality', 'string');
    const country = validateField(data, 'country', 'string');
    const region = validateField(data, 'region', 'string');
    const district = validateField(data, 'district', 'string');
    const street = validateField(data, 'street', 'string');
    const homeNumber = validateField(data, 'homeNumber', 'string');
    const registrationRegion = validateField(data, 'registrationRegion', 'string');
    const education = validateField(data, 'education', 'string');
    const speciality = validateField(data, 'speciality', 'string');
    const maritalStatus = validateField(data, 'maritalStatus', 'boolean');
    const numberOfChild = validateField(data, 'numberOfChild', 'number');
    const motherFullname = validateField(data, 'motherFullname', 'string', 9, 9);
    const matherWorkPlace = validateField(data, 'matherWorkPlace', 'string');
    const fatherFullname = validateField(data, 'fatherFullname', 'string', 9, 9);
    const fatherWorkPlace = validateField(data, 'fatherWorkPlace', 'string');
    const tosAgreement = validateField(data, 'tosAgreement', 'boolean');

    if (firstName && sureName && lastName && birthday && phone && passportNumber && country && registrationRegion && education && tosAgreement) {
        // Make sure the user doesnt already exist
        const isExist = await employee.read({ 'passportNumber': passportNumber, })

        if (isExist.payload.searchResults[0]) {
            return { statusCode: 400, payload: { 'Error': 'Пользователь с таким номером паспорта уже существует' } };
        }

        const employeeObject = {
            'firstName': firstName,
            'sureName': sureName,
            'lastName': lastName,
            'birthday': birthday,
            'passportNumber': passportNumber,
            'phone': phone,
            'secondPhone': secondPhone,
            'nationality': nationality,
            'education': education,
            'speciality': speciality,
            'maritalStatus': maritalStatus,
            'numberOfChild': numberOfChild,
            'motherFullname': motherFullname,
            'matherWorkPlace': matherWorkPlace,
            'fatherFullname': fatherFullname,
            'fatherWorkPlace': fatherWorkPlace,
            'tosAgreement': true
        };

        const employeeAddress = {
            'country': country,
            'region': region,
            'district': district,
            'street': street,
            'homeNumber': homeNumber,
            'registrationRegion': registrationRegion,
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
