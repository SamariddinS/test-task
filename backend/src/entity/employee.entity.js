//  ***   Employee Entity    ***

// Check that all required fields are filled out
function validateField(payload, field, type, minLength = 2, exactLength = null) {
    const value = payload[field];
    if (typeof value === type && value.trim().length >= minLength) {
        if (exactLength !== null && value.trim().length !== exactLength) {
            return false;
        }
        if (typeof type === 'boolean') {
            return true
        }
        return value.trim();
    }
    return false;
}

// Define all the handlers
export const employee = {};

employee.create = async (data) => {
    const firstName = validateField(data, 'firstName', 'string');
    const sureName = validateField(data, 'sureName', 'string');
    const lastName = validateField(data, 'lastName', 'string');
    const birthday = validateField(data, 'birthday', Date);
    const passportNumber = validateField(data, 'passportSeria', 'string', 9, 9);
    const phone = validateField(data, 'phone', 'string', 12, 12);
    const secondPhone = validateField(data, 'phone', 'string', 12, 12);
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
    const sisterFullname = validateField(data, 'sisterFullname', 'string', 9, 9);
    const sisterMaritalStatus = validateField(data, 'sisterMaritalStatus', 'boolean');
    const brotherFullname = validateField(data, 'brotherFullname', 'string', 9, 9)
    const brotherMaritalStatus = validateField(data, 'brotherMaritalStatus', 'boolean')
    const tosAgreement = validateField(data, 'tosAgreement', 'boolean')

    if (firstName && sureName && lastName && phone && passportNumber && tosAgreement) {
        // Make sure the user doesnt already exist
        if (employee.read(passportNumber)) {

        }

        const userObject = {
            'firstName': firstName,
            'sureName': sureName,
            'lastName': lastName,
            'birthday': birthday,
            'passportNumber': passportNumber,
            'phone': phone,
            'secondPhone': secondPhone,
            'nationality': nationality,
            'country': country,
            'region': region,
            'district': district,
            'street': street,
            'homeNumber': homeNumber,
            'registrationRegion': registrationRegion,
            'education': education,
            'speciality': speciality,
            'maritalStatus': maritalStatus,
            'numberOfChild': numberOfChild,
            'motherFullname': motherFullname,
            'matherWorkPlace': matherWorkPlace,
            'fatherFullname': fatherFullname,
            'fatherWorkPlace': fatherWorkPlace,
            'sisterFullname': sisterFullname,
            'sisterMaritalStatus': sisterMaritalStatus,
            'brotherFullname': brotherFullname,
            'brotherMaritalStatus': brotherMaritalStatus,
            'tosAgreement': true
        };
    } else {
        return 400, { 'Error': 'Missing required fields' };
    }
}
