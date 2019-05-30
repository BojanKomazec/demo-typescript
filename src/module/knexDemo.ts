import { IConfig } from '../types';

export async function knexDemo(config: IConfig) {
    const options = {
        client: 'pg',
        connection: {
            database : config.db.database,
            host : config.db.host,
            password : config.db.password,
            user : config.db.user,
        },
        version: '7.2',
    };

    const knex = require('knex')(options);

    knex.raw('SELECT VERSION()')
    .then(
        (version: any) => {
            console.log(version);
        },
    ).catch(
        (err: any) => {
            console.log(err);
            throw err;
        },
    ).finally(
        () => {
            knex.destroy();
        },
    );

    // const res = await knex.select().from('users').limit(10);
}
