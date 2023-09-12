//  ***   Employee Entity    ***

import { boolean, minLength, number, object, safeParse, string } from 'valibot';
import { employeeRepository } from '../repository/employee.repository.js';


// Define all the handlers
export const employee = {};

employee.create = async (data) => {
    const employeeSchema = object({
        firstName: string([minLength(3)]),
        sureName: string([minLength(3)]),
        lastName: string([minLength(3)]),
        birthday: string([minLength(3)]),
        passportNumber: string([minLength(9)]),
        phone: string([minLength(12)]),
        secondPhone: string([minLength(12)]),
        nationality: string([minLength(5)]),
        country: string([minLength(5)]),
        region: string([minLength(5)]),
        district: string([minLength(5)]),
        street: string([minLength(5)]),
        homeNumber: string([minLength(2)]),
        registrationRegion: string([minLength(5)]),
        education: string(),
        speciality: string([minLength(5)]),
        maritalStatus: string(),
        numberOfChild: number(),
        motherFullname: string([minLength(9)]),
        matherWorkPlace: string([minLength(9)]),
        fatherFullname: string([minLength(9)]),
        fatherWorkPlace: string([minLength(9)]),
        sisterFullname: string([minLength(9)]),
        brotherFullname: string([minLength(9)]),
        tosAgreement: boolean()
    });

    var isSchemaValid = safeParse(employeeSchema, data).success

    const educationId = await employeeRepository.getSelectableValueId('education_degrees', 'education_degree', data.education);
    const maritalStatusId = await employeeRepository.getSelectableValueId('marital_statuses', 'status_name', data.maritalStatus);

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
