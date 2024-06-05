import pg from 'pg';

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'itinerary_app_test_db',
    password: '!FalcoLevigato2002',
    port: 5433,
});
await db.connect();


export default db