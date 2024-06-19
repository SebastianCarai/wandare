import pg from 'pg';

const connectionString = process.env.POSTGRESQL_URI;

const db = new pg.Client({
    connectionString
});
await db.connect();

export default db