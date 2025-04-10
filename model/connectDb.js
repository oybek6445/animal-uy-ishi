const pg = require(`pg`)

let db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'najot',
    password: '1234',
    port: 5432
    });

