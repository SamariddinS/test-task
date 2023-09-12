import path from 'path';
import sqlite3 from 'sqlite3';

const DATABASE_PATH = path.join(path.dirname('__dirname'), '/././././db/test.db');
const db = new sqlite3.Database(DATABASE_PATH);

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
                    educationId,
                    speciality,
                    maritalStatusId,
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

        if (criteria.sureName) {
            searchQuery += values.length === 0 ? ` WHERE` : ` AND`;
            searchQuery += ` sureName LIKE ?`;
            values.push(`%${criteria.sureName}%`);
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

        if (criteria.phone) {
            searchQuery += values.length === 0 ? ` WHERE` : ` AND`;
            searchQuery += ` phone = ?`;
            values.push(criteria.phone);
        }

        if (criteria.country) {
            searchQuery += values.length === 0 ? ` WHERE` : ` AND`;
            searchQuery += ` country = ?`;
            values.push(criteria.country);
        }

        if (criteria.region) {
            searchQuery += values.length === 0 ? ` WHERE` : ` AND`;
            searchQuery += ` region = ?`;
            values.push(criteria.region);
        }

        if (criteria.education) {
            searchQuery += values.length === 0 ? ` WHERE` : ` AND`;
            searchQuery += ` education = ?`;
            values.push(criteria.education);
        }

        if (criteria.speciality) {
            searchQuery += values.length === 0 ? ` WHERE` : ` AND`;
            searchQuery += ` speciality = ?`;
            values.push(criteria.speciality);
        }

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
                educationId = ?,
                speciality = ?,
                maritalStatusId = ?,
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

employeeRepository.getSelectableValueId = async (tableName, columnName, value) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT id FROM ${tableName}
            WHERE ${columnName} = ?
        `;
        db.get(query, [value], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row ? row.id : null);
            }
        });
    });
}
