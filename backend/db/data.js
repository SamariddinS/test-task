import path from 'path';
import sqlite3 from 'sqlite3';

// Create a new SQLite database connection
const db = new sqlite3.Database(path.join(path.dirname('__dirname'), 'test.db'));

// Initialize the employee table if it doesn't exist
db.run(`
CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    sureName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    birthday TEXT,
    passportNumber TEXT NOT NULL,
    phone TEXT NOT NULL,
    secondPhone TEXT,
    nationality TEXT,
    education TEXT,
    speciality TEXT,
    maritalStatus INTEGER NOT NULL,
    numberOfChild INTEGER,
    motherFullname TEXT NOT NULL,
    motherWorkPlace TEXT,
    fatherFullname TEXT NOT NULL,
    fatherWorkPlace TEXT,
    tosAgreement BOOLEAN NOT NULL
);
CREATE TABLE IF NOT EXISTS employeeAddress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employeeId INTEGER NOT NULL,
    country TEXT,
    region TEXT,
    district TEXT,
    street TEXT,
    homeNumber TEXT,
    registrationRegion TEXT,
    FOREIGN KEY (employeeId) REFERENCES employees(id)
);
`);
