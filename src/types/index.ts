interface IDbConfig {
    database: string;
    host: string;
    password: string;
    port: number;
    user: string;
}

interface IConfig {
    db: IDbConfig;
}

export {
    IConfig,
};
