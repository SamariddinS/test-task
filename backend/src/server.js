/*  Dependencies  */
import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';
import url from 'url';
import { debuglog } from 'util';
import { environmentToExport as config } from './config.js';
import { handlers } from './handlers.js';
import { helpers } from './helpers.js';

const debug = debuglog('server');


// Instantiate the server module object
export const server = {};


// Instantiate the HTTP server
server.httpServer = http.createServer((req, res) => {
    server.unifiedServer(req, res);
});


// Instantiate the HTTPS server
server.httpsServerOptions = {
    'key': fs.readFileSync(path.join(path.dirname('__dirname'), '/././https/key.pem')),
    'curt': fs.readFileSync(path.join(path.dirname('__dirname'), '/././https/cert.pem')),
};

server.httpsServer = https.createServer(server.httpsServerOptions, (req, res) => {
    server.unifiedServer(req, res);
});


// All the server logic for both the http and https server
server.unifiedServer = (req, res) => {
    // Get the URL and parse it
    const parsedUrl = url.parse(req.url, true);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    const queryStringObject = parsedUrl.query;

    // Get the HTTP Method
    const method = req.method.toLowerCase();

    // Get the headers as an object
    const headers = req.headers;

    // Get the payload, if any
    let buffer = '';

    req.on('data', (data) => {
        buffer += new TextDecoder().decode(data);
    });
    req.on('end', async () => {

        // Check the handler this request should go to. If one is not found, use the notFound handler instead.
        const chosenHandler = typeof (server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;

        // Construct the data object to send to the handler
        const data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': helpers.parseJsonToObject(buffer),
        };

        // Route the request to the handler specified in the router
        let { payload, statusCode } = await chosenHandler(data)

        // Use the status code called back handler, or default status code to 200
        statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

        // Use the payload called back by the handler, or default payload to an empty object
        payload = typeof (payload) == 'object' ? payload : {};

        // Convert the payload to a string
        const payloadString = JSON.stringify(payload);

        // CORS
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        // Return the response
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(payloadString);

        // If respons is 200, print green, otherwise print red
        if (statusCode == 200) {
            debug('\x1b[32m%s\x1b[0m', `${method.toUpperCase()} ${trimmedPath} ${statusCode} ${payloadString.length}`);
        }
        else {
            debug('\x1b[31m%s\x1b[0m', `${method.toUpperCase()} ${trimmedPath} ${statusCode} ${payloadString.length}`);
        }
    });
};

// Define a request router
server.router = {
    'ping': handlers.ping,
    'employee': handlers.employee,
};

// Init script
server.init = () => {
    // Start the HTTP server
    server.httpServer.listen(config.httpPort, () => {
        console.log('\x1b[36m%s\x1b[0m', `The server is listening on port ${config.httpPort}`);
    });

    // Start the HTTPS server
    server.httpsServer.listen(config.httpsPort, () => {
        console.log('\x1b[35m%s\x1b[0m', `The server is listening on port ${config.httpsPort}`);
    });
}
