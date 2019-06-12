import { IConfig } from '../types';

export async function connectionDemo(config: IConfig) {
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

async function createMigrationFile(config: IConfig): Promise<any> {
    return new Promise((resolve, reject) => {
        const { spawn } = require('child_process');
        // knex migrate:make merchants_products
        const knex = spawn('knex', ['migrate:make', process.env.DB_NAME]);

        knex.stdout.on('data', (data: any) => {
            console.log(`stdout: ${data}`);
        });

        knex.stderr.on('data', (data: any) => {
            console.log(`stderr: ${data}`);
        });

        knex.on('close', (code: any) => {
            console.log(`child process exited with code ${code}`);
            if (code === 0) {
                resolve(code);
            } else {
                reject(code);
            }
        });
    });
}

async function runMigration(config: IConfig): Promise<any> {
    return new Promise((resolve, reject) => {
        const { spawn } = require('child_process');
        // knex migrate:make merchants_products
        const knex = spawn('knex', ['migrate:latest']);

        knex.stdout.on('data', (data: any) => {
            console.log(`stdout: ${data}`);
        });

        knex.stderr.on('data', (data: any) => {
            console.log(`stderr: ${data}`);
        });

        knex.on('close', (code: any) => {
            console.log(`child process exited with code ${code}`);
            if (code === 0) {
                resolve(code);
            } else {
                reject(code);
            }
        });
    });
}

async function migrationDemo(config: IConfig): Promise<any> {
    await createMigrationFile(config);
    await runMigration(config);
}

export async function knexDemo(config: IConfig) {
    // await connectionDemo(config);
    await migrationDemo(config);
}
