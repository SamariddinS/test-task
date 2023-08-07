//  ***   Request handlers    ***

import { employee } from './employee/entity/employee.entity.js';

// Define all the handlers
export const handlers = {};

// Ping
handlers.ping = () => {
    return 200;
};

// Not-Found
handlers.notFound = () => {
    return 404;
};


// Employee
handlers.employee = async (data) => {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        return await handlers._employee[data.method](data);
    } else {
        return 405;
    }
};

// Container for all the employee methods
handlers._employee = {};

handlers._employee.post = (data) => {
    // Store the user
    return employee.create(data.payload)
};

handlers._employee.get = (data) => {
    // Get the user
    return employee.read(data.payload)
};

handlers._employee.put = (data) => {
    // Update the user
    return employee.update(data.payload)
};

handlers._employee.delete = (data) => {
    // Delete the user
    return employee.delete(data.payload)
};
