const express = require('express');
const ODBCConn = require("./odbc_conn");

require('dotenv').config();
BigInt.prototype.toJSON = function() { return this.toString() }

const app = express();

let odbcConn = new ODBCConn(process.env.ODBC_CONNECTION_STRING);

app.get('/', async (req, res) => {
    try {
        let tableName = req.query['tableName'] || 'SQLUser.PA_Adm';
        let count = req.query['count'] || '10';

        let result = await odbcConn.query(tableName, count);

        res.json({
            "status": "OK",
            result
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
