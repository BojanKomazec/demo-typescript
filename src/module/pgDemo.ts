
import { IConfig } from '../types';

export async function testDb(config: IConfig): Promise<void> {
    const { Client } = require('pg');
    const client = new Client({
        database: config.db.database,
        host: config.db.host,
        password: config.db.password,
        port: config.db.port,
        user: config.db.user,
      });

    await client.connect();

    const res = await client.query('SELECT $1::text as message', ['Hello world!']);
    console.log(res.rows[0].message); // Hello world!
    await client.end();
}
