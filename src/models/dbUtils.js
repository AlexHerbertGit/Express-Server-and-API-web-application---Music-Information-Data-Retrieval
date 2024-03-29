const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'db.json');

//Read data from JSON file
const readDbFile = () => {
    try {
        const data = fs.readFileSync(dbPath, 'utf8')
        return JSON.parse(data);
    } catch (err) {
        throw new Error("Erro reading from db.json");
    }
};

//Write to JSON file
const writeDbFile = (data) => {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8")
    } catch (err) {
        throw new Error("Error writing to db.json")
    }
}

module.exports = { readDbFile, writeDbFile };