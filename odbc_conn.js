const odbc = require("odbc");

class ODBCConn
{
    config = {};
    connection = null;

    constructor(odbcConnString) {
        this.config = {
            connectionString: odbcConnString
        };
    }

    async query(tableName, count, where = "") {
        try {
            await this.connect();
            let result = await this.connection.query(`SELECT TOP ${count} * FROM ${tableName} ${where}`);

            return result;
        } catch (error) {
            return {
                'error': error
            };
        } finally {
            await this.disconnect();
        }

        // await this.connect();

        // let result = await this.connection.query(`SELECT TOP ${count} * FROM ${tableName}`);

        // await this.disconnect();

        return result;
    }

    async connect() {
        this.connection = await odbc.connect(this.config);
    }

    async disconnect() {
        await this.connection.close();
    }
}

module.exports = ODBCConn;