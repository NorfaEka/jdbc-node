const express = require('express');
const odbc = require('odbc');

require('dotenv').config();
BigInt.prototype.toJSON = function() { return this.toString() }

const app = express();

// ODBC configuration
const config = {
    connectionString: process.env.ODBC_CONNECTION_STRING,
};

app.get('/', async (req, res) => {
    try {
        let tableName = req.query['tableName'] || 'PA_Adm';
        let count = req.query['count'] || '10';
        const connection = await odbc.connect(config);

        const result = await connection.query(`SELECT TOP ${count} * FROM SQLUser.${tableName}`);

        await res.json({
            "status": "OK",
            result
        });
        await connection.close();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
