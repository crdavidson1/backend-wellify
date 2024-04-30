const { Pool } = require('pg');

module.exports = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres', 
    password: 'mysecretpassword', 
    port: 5432, 
});