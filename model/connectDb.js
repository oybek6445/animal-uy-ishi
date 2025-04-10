const pg = require('pg')

const connect = async () => {
    const db = new pg.Client({
        user: process.env.DB_USER || 'postgres',
        host: process.env.HOST ||'localhost',
        database: process.env.db || 'najot',
        password:  process.env.password || '1234',
        port:  process.env.dbport || 5432
    });

    try {
        await db.connect()
        console.log('DBga ulandi')
        return db
    } catch (err) {
        console.error('Ulanmadi', err)
        throw err
    }
}

module.exports = connect



