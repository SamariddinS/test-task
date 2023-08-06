//  ***   Dependencies   ***
import { server } from "./lib/server.js";


// Declare the app
export const app = {};

// Init the function
app.init = () => {
    // Start the server
    server.init();
};

// Execute
app.init();
