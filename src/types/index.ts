interface IDbConfig {
    database: string;
    host: string;
    password: string;
    port: number;
    user: string;
}

interface IHttpConfig {
    httpRequestTimeout: number;
    httpResponseTimeout: number;
}

interface IConfig {
    db: IDbConfig;
    http: IHttpConfig;
}

export {
    IConfig,
};
