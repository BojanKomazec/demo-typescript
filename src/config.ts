import { IConfig } from './types';

export function loadConfig(): IConfig {
    const defaultPgHost = 'localhost';
    const defaultPgDatabase = 'demo_ts';
    const defaultPgUser = 'postgres';
    const defaultPgPassword = 'postgres';
    const defaultPgPort = '5432';

    const defaultHttpRequestTimeout = '5000';
    const defaultHttpResponseTimeout = '10000';

    return {
        db: {
            database: process.env.DB_NAME || defaultPgDatabase,
            host: process.env.DB_HOST || defaultPgHost,
            password: process.env.DB_PASSWORD || defaultPgPassword,
            port: parseInt(process.env.DB_PORT || defaultPgPort, 10),
            user: process.env.DB_USER || defaultPgUser,
        },
        http: {
            httpRequestTimeout: parseInt(process.env.HTTP_REQUEST_TIMEOUT || defaultHttpRequestTimeout, 10),
            httpResponseTimeout: parseInt(process.env.HTTP_RESPONSE_TIMEOUT || defaultHttpResponseTimeout, 10),
        },
    };
}
