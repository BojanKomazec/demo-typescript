import request = require('request');
// const request = require('request');

export function httpClientDemo() {
    // requestDemo();
    urlDemo();
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

function urlDemo(): void {
    let query = '/?post_type=test';
    let baseUrl = 'https://www.example.com/api';
    let urlStr = new URL(query, baseUrl).toString();
    console.log('(1) urlStr =', urlStr);
    // https://www.example.com/?post_type=test

    query = '?post_type=test';
    baseUrl = 'https://www.example.com/api/';
    urlStr = new URL(query, baseUrl).toString();
    console.log('(2) urlStr =', urlStr);
    // https://www.example.com/api/?post_type=test

    query = '/?post_type=test';
    baseUrl = 'https://www.example.com/api/';
    urlStr = new URL(query, baseUrl).toString();
    console.log('(3) urlStr =', urlStr);
    // https://www.example.com/?post_type=test

    query = '/?post_type=test';
    baseUrl = 'https://www.example.com/api/new';
    urlStr = new URL(query, baseUrl).toString();
    console.log('(4) urlStr =', urlStr);
    // https://www.example.com/?post_type=test

    query = '/?post_type=test';
    baseUrl = 'https://www.example.com/api/new/';
    urlStr = new URL(query, baseUrl).toString();
    console.log('(5) urlStr =', urlStr);
    // https://www.example.com/?post_type=test

    query = '?post_type=test';
    baseUrl = 'https://www.example.com/api/new/';
    urlStr = new URL(query, baseUrl).toString();
    console.log('(6) urlStr =', urlStr);
    // https://www.example.com/api/new/?post_type=test

    query = '?post_type=test';
    baseUrl = 'https://www.example.com/api/new';
    urlStr = new URL(query, baseUrl).toString();
    console.log('(7) urlStr =', urlStr);
    // https://www.example.com/api/new?post_type=test

    //
    // base url is domain name
    //
    // Domain names with or without trailing slash are same!
    // https://searchfacts.com/url-trailing-slash/

    // path: no slash at the beginning
    // base: has slash at the end
    let path = 'api/';
    let base = 'https://www.example.com/';
    let url = new URL(path, base);
    console.log('(8) url = ', url.toString());
    // https://www.example.com/api (NO slash at the end, also if path is 'api')
    url.searchParams.set('post_type', 'testPost');
    url.searchParams.set('json', '1');
    url.searchParams.set('count', '1000');
    console.log('(8) url = ', url.toString());
    // https://www.example.com/api/?post_type=testPost&json=1&count=1000

    // path: no slash at the beginning
    // base: is domain name and has no slash at the end
    // slash is injeced between them automatically!
    path = 'api/';
    base = 'https://www.example.com';
    url = new URL(path, base);
    console.log('(9) url = ', url.toString());
    // https://www.example.com/api (NO slash at the end, also if path is 'api')
    url.searchParams.set('post_type', 'testPost');
    url.searchParams.set('json', '1');
    url.searchParams.set('count', '1000');
    console.log('(9) url = ', url.toString());
    // https://www.example.com/api/?post_type=testPost&json=1&count=1000

    // path: no slash at the beginning
    // base: has slash at the end
    path = '/api/';
    base = 'https://www.example.com/';
    url = new URL(path, base);
    console.log('(91) url = ', url.toString());
    // https://www.example.com/api (NO slash at the end, also if path is 'api')
    url.searchParams.set('post_type', 'testPost');
    url.searchParams.set('json', '1');
    url.searchParams.set('count', '1000');
    console.log('(91) url = ', url.toString());
    // https://www.example.com/api/?post_type=testPost&json=1&count=1000

    // path: no slash at the beginning
    // base: is domain name and has no slash at the end
    // slash is injeced between them automatically!
    path = '/api/';
    base = 'https://www.example.com';
    url = new URL(path, base);
    console.log('(92) url = ', url.toString());
    // https://www.example.com/api (NO slash at the end, also if path is 'api')
    url.searchParams.set('post_type', 'testPost');
    url.searchParams.set('json', '1');
    url.searchParams.set('count', '1000');
    console.log('(92) url = ', url.toString());

    //
    // Path with multiple segments
    //
    // https://searchfacts.com/url-trailing-slash/
    //
    // base:
    //      if value ends with hostname: it can but does not need to end with slash
    //      if value ends with path segment: it must end with slash
    // path:
    //      it can but does not need to start with slash
    //      it must end with slash

    // path: no slash at the beginning, slash at the end
    // base: slash at the end
    path = 'api/v2/';
    base = 'https://www.example.com/';
    url = new URL(path, base);
    console.log('(10) url = ', url.toString());
    // https://www.example.com/api/v2/
    url.searchParams.set('post_type', 'testPost');
    url.searchParams.set('json', '1');
    url.searchParams.set('count', '1000');
    console.log('(10) url = ', url.toString());
    // https://www.example.com/api/v2/?post_type=testPost&json=1&count=1000

    // path: no slash at the beginning, slash at the end
    // base: NO slash at the end
    path = 'api/v2/';
    base = 'https://www.example.com';
    url = new URL(path, base);
    console.log('(11) url = ', url.toString());
    // https://www.example.com/api/v2/
    url.searchParams.set('post_type', 'testPost');
    url.searchParams.set('json', '1');
    url.searchParams.set('count', '1000');
    console.log('(11) url = ', url.toString());
    // https://www.example.com/api/v2/?post_type=testPost&json=1&count=1000

    // path: slash at the beginning, slash at the end
    // base: NO slash at the end
    path = '/api/v2/';
    base = 'https://www.example.com';
    url = new URL(path, base);
    console.log('(12) url = ', url.toString());
    // https://www.example.com/api/v2/
    url.searchParams.set('post_type', 'testPost');
    url.searchParams.set('json', '1');
    url.searchParams.set('count', '1000');
    console.log('(12) url = ', url.toString());
    // https://www.example.com/api/v2/?post_type=testPost&json=1&count=1000

    // path: slash at the beginning, slash at the end
    // base: slash at the end
    path = '/api/v2/';
    base = 'https://www.example.com/';
    url = new URL(path, base);
    console.log('(13) url = ', url.toString());
    // https://www.example.com/api/v2/
    url.searchParams.set('post_type', 'testPost');
    url.searchParams.set('json', '1');
    url.searchParams.set('count', '1000');
    console.log('(13) url = ', url.toString());
    // https://www.example.com/api/v2/?post_type=testPost&json=1&count=1000
}
