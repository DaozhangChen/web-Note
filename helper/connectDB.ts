import mysql from 'mysql'

export const connectDB = () => {
    const connection = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'Bb15880493793.',
        database: 'list',
        connectionLimit: 10
    })
    return connection
}