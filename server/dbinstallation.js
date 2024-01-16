const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const dbName = '../database/database.db';

const db = new sqlite3.Database(dbName);

function executeSqlScript(filePath) {
    const sqlScript = fs.readFileSync(filePath, 'utf-8');
    db.exec(sqlScript, (err) => {
        if (err) {
            console.error(`Error executing SQL script: ${err.message}`);
        } else {
            console.log(`SQL script executed successfully: ${filePath}`);
        }
    });
}

db.exec("DROP TABLE IF EXISTS Gamer;\n" +
    "DROP TABLE IF EXISTS Participation;\n" +
    "DROP TABLE IF EXISTS Tournament;\n")

executeSqlScript('../database/create-tables.sql');

executeSqlScript('../database/insert_values.sql');

db.close((err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Database closed.');
    }
});
