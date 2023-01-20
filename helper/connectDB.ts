import mysql from 'mysql'

export const connectDB = () => {
    const connection = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'b15880493793.',
        database: 'list',
        connectionLimit: 10
    })
    return connection
}