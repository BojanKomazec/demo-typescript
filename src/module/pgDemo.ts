
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
  await demoTestingIfTableExists('contacts', client);
  await demoTestingIfTableExists('contacts_nonexisting', client);
  await client.end();
}

/**
 * If table e.g. contacts exists, the output is:
 * @param tableName
 * @param client
 */
async function demoTestingIfTableExists(tableName: string, client: any): Promise<void> {
  const queryExists: string = 'SELECT to_regclass(\'public.' + tableName + '\')';
  const { rows } = await client.query(queryExists);

  if (rows) {
    console.log(JSON.stringify(rows));
    if (rows[0].to_regclass) {
      console.log(`Table ${tableName} exists.`);
    } else {
      console.log(`Table ${tableName} does not exist.`);
    }
  } else {
    console.log(`Query ${queryExists} did not return any rows.`);
  }
}
