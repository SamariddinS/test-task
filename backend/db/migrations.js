import path from 'path';
import sqlite3 from 'sqlite3';

const DATABASE_PATH = path.join(path.dirname('__dirname'), 'test.db');
const db = new sqlite3.Database(DATABASE_PATH);

db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    // Create tos_agreements table
    db.run(`
        CREATE TABLE IF NOT EXISTS education_degrees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            education_degree TEXT NOT NULL
        );
    `);

    // Create marital_statuses table
    db.run(`
        CREATE TABLE IF NOT EXISTS marital_statuses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            status_name TEXT NOT NULL
        );
    `);

    db.run(`INSERT INTO education_degrees (education_degree) VALUES ('high school');`)
    db.run(`INSERT INTO education_degrees (education_degree) VALUES ('bachelor');`)
    db.run(`INSERT INTO education_degrees (education_degree) VALUES ('magister');`)

    db.run(`INSERT INTO marital_statuses (status_name) VALUES ('single');`)
    db.run(`INSERT INTO marital_statuses (status_name) VALUES ('married');`)
    db.run(`INSERT INTO marital_statuses (status_name) VALUES ('divorced');`)

    // Add foreign key constraint to employees table for tosAgreementId
    db.run(`
        PRAGMA foreign_keys=off;
        `);
    db.run(`
        CREATE TABLE employees_temp AS SELECT * FROM employees;
        `);
    db.run(`
        DROP TABLE employees;
        `);
    db.run(`
        CREATE TABLE employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT NOT NULL,
            sureName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            birthday TEXT,
            passportNumber TEXT NOT NULL,
            phone TEXT NOT NULL,
            secondPhone TEXT,
            nationality TEXT,
            educationId INTEGER,
            speciality TEXT,
            maritalStatusId INTEGER,
            numberOfChild INTEGER,
            motherFullname TEXT NOT NULL,
            motherWorkPlace TEXT,
            fatherFullname TEXT NOT NULL,
            fatherWorkPlace TEXT,
            tosAgreement BOOLEAN NOT NULL,
            FOREIGN KEY (maritalStatusId) REFERENCES marital_statuses(id),
            FOREIGN KEY (educationId) REFERENCES education_degrees(id)
        );
        `);
    db.run(`
        INSERT INTO employees SELECT * FROM employees_temp;
        `);
    db.run(`
        DROP TABLE employees_temp;
        `);
    db.run(`
        PRAGMA foreign_keys=on;
    `);

    // Commit the transaction
    db.run('COMMIT', (err) => {
        if (err) {
            console.error('Error committing transaction:', err);
        } else {
            console.log('Migration completed successfully.');
        }
    });
});

// Close the database connection
db.close();
