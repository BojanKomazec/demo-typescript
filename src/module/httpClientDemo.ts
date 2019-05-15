import request = require('request');
// const request = require('request');

export function httpClientDemo() {
    requestDemo();
}

function requestDemo(): void {
    request('http://www.google.com', (error: any, response: request.Response, body: any) => {
        // Print the error if one occurred
        console.log('error:', error);

        // Print the response status code if a response was received
        console.log('statusCode:', response && response.statusCode);

        // Print the HTML for the Google homepage.
        console.log('body:', body);
    });
}
