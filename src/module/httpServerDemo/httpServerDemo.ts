import fs = require('fs');
import http = require('http');
import url = require('url');

// If we don't check that req.url is not 'undefined' then url.parse(req.url) will throw an error:
// Argument of type 'string | undefined' is not assignable to parameter of type 'string'
// tslint:disable-next-line: max-line-length
// https://stackoverflow.com/questions/46915002/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string
function requestListener(req: http.IncomingMessage, res: http.ServerResponse): void {
    if (!req.url) {
        return;
    }

    const urlWithStringQuery: url.UrlWithStringQuery = url.parse(req.url);
    console.log(`urlWithStringQuery.query = ${urlWithStringQuery.query}`);
    const filename = 'src/module/httpServerDemo/html' + urlWithStringQuery.pathname;
    console.log(`filename = ${filename}`);

    fs.readFile(filename, (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end('404 Not Found');
        }

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}

// To test it, open your local browser and type in http://localhost:8080/index.html.
export function httpServerDemo() {
    http.createServer(requestListener).listen(8080);
}
