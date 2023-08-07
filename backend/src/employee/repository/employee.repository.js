import path from 'path';
import sqlite3 from 'sqlite3';

// Create a new SQLite database connection
const db = new sqlite3.Database(path.join(path.dirname('__dirname'), '/././././db/test.db'));

// Define the employeeRepository object
export const employeeRepository = {};

employeeRepository.save = async (employeeObject, addressObject) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('BEGIN TRANSACTION');

            const insertEmployeeQuery = `
                INSERT INTO employees (
                    firstName,
                    sureName,
                    lastName,
                    birthday,
                    passportNumber,
                    phone,
                    secondPhone,
                    nationality,
                    education,
                    speciality,
                    maritalStatus,
                    numberOfChild,
                    motherFullname,
                    motherWorkPlace,
                    fatherFullname,
                    fatherWorkPlace,
                    tosAgreement
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            db.run(
                insertEmployeeQuery,
                [
                    employeeObject.firstName,
                    employeeObject.sureName,
                    employeeObject.lastName,
                    employeeObject.birthday,
                    employeeObject.passportNumber,
                    employeeObject.phone,
                    employeeObject.secondPhone,
                    employeeObject.nationality,
                    employeeObject.education,
                    employeeObject.speciality,
                    employeeObject.maritalStatus ? 1 : 0,
                    employeeObject.numberOfChild,
                    employeeObject.motherFullname,
                    employeeObject.motherWorkPlace,
                    employeeObject.fatherFullname,
                    employeeObject.fatherWorkPlace,
                    employeeObject.tosAgreement ? 1 : 0,
                ],
                function (err) {
                    if (err) {
                        db.run('ROLLBACK');
                        reject(err);
                        return;
                    }

                    const employeeId = this.lastID;

                    const insertAddressQuery = `
                        INSERT INTO employeeAddress (
                            employeeId,
                            country,
                            region,
                            district,
                            street,
                            homeNumber,
                            registrationRegion
                        ) VALUES (?, ?, ?, ?, ?, ?, ?)
                    `;

                    db.run(
                        insertAddressQuery,
                        [
                            employeeId,
                            addressObject.country,
                            addressObject.region,
                            addressObject.district,
                            addressObject.street,
                            addressObject.homeNumber,
                            addressObject.registrationRegion,
                        ],
                        function (err) {
                            if (err) {
                                db.run('ROLLBACK');
                                reject(err);
                                return;
                            }

                            db.run('COMMIT');
                            resolve(employeeId);
                        }
                    );
                }
            );
        });
    });
};

employeeRepository.searchEmployees = async (criteria) => {
    JSON.stringify(criteria, null, 4)
    if (Object.keys(criteria).length === 0) {
        return []
    }

    return new Promise((resolve, reject) => {
        let searchQuery = `
            SELECT * FROM employees
        `;

        const values = [];

        if (criteria.firstName) {
            searchQuery += ` WHERE firstName LIKE ?`;
            values.push(`%${criteria.firstName}%`);
        }

        if (criteria.lastName) {
            searchQuery += values.length === 0 ? ` WHERE` : ` AND`;
            searchQuery += ` lastName LIKE ?`;
            values.push(`%${criteria.lastName}%`);
        }

        if (criteria.passportNumber) {
            searchQuery += values.length === 0 ? ` WHERE` : ` AND`;
            searchQuery += ` passportNumber = ?`;
            values.push(criteria.passportNumber);
        }

        // #TODO Add more criteria as needed...

        db.all(searchQuery, values, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(rows);
        });
    });
};


employeeRepository.update = async (passportNumber, updatedData) => {
    return new Promise((resolve, reject) => {
        const updateQuery = `
            UPDATE employees
            SET
                firstName = ?,
                sureName = ?,
                lastName = ?,
                birthday = ?,
                passportNumber = ?,
                phone = ?,
                secondPhone = ?,
                nationality = ?,
                education = ?,
                speciality = ?,
                maritalStatus = ?,
                numberOfChild = ?,
                motherFullname = ?,
                motherWorkPlace = ?,
                fatherFullname = ?,
                fatherWorkPlace = ?,
                tosAgreement = ?
            WHERE passportNumber = ?
        `;

        const updateValues = [
            updatedData.firstName,
            updatedData.sureName,
            updatedData.lastName,
            updatedData.birthday,
            updatedData.passportNumber,
            updatedData.phone,
            updatedData.secondPhone,
            updatedData.nationality,
            updatedData.education,
            updatedData.speciality,
            updatedData.maritalStatus ? 1 : 0,
            updatedData.numberOfChild,
            updatedData.motherFullname,
            updatedData.motherWorkPlace,
            updatedData.fatherFullname,
            updatedData.fatherWorkPlace,
            updatedData.tosAgreement ? 1 : 0,
            passportNumber,
        ];

        db.run(updateQuery, updateValues, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes); // Returns the number of rows updated
            }
        });
    });
};

employeeRepository.delete = async (passportNumber) => {
    return new Promise((resolve, reject) => {
        const deleteQuery = `
            DELETE FROM employees
            WHERE passportNumber = ?
        `;

        db.run(deleteQuery, passportNumber, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes); // Returns the number of rows deleted
            }
        });
    });
};
