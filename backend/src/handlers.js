//  ***   Request handlers    ***

import fs from 'fs/promises';
import path from 'path';
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

handlers.index = async () => {
    const indexHtmlPath = path.join(path.dirname('__dirname'), '/././public/index.html')

    try {
        const content = await fs.readFile(indexHtmlPath, 'utf8');
        // Return the HTML content with a 200 status code
        return { statusCode: 200, payload: content };
    } catch (err) {
        console.error(err);
        return 500; // Return a 500 status code if there's an error reading the file
    }
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
    return employee.read(data.queryStringObject)
};

handlers._employee.put = (data) => {
    // Update the user
    return employee.update(data.payload)
};

handlers._employee.delete = (data) => {
    // Delete the user
    return employee.delete(data.payload)
};
