import db from '../database/db'

class Employee {

	static createAccount(businessId, firstName, lastName, email, phoneNumber, isAdmin, password, profileImageUrl) {
		const queryText = 'INSERT INTO employee (businessId, first_name, last_name, email, phone_number, is_admin, password, profile_image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);'
		return db.query(queryText, [businessId, firstName, lastName, email, phoneNumber, isAdmin, password, profileImageUrl])
	}

	static updateAccount(employeeId, firstName, lastName, email, phoneNumber, isAdmin, password, profileImageUrl){
		const queryText = 'UPDATE employee SET first_name = $2, last_name = $3, email = $4, phone_number = $5, is_admin = $6, password = $7, profile_image_url = $8 WHERE id = $1;'
		return db.query(queryText,[employeeId, firstName, lastName, email, phoneNumber, isAdmin, password, profileImageUrl])
			.then((data) => data.rows)
	}

	static deleteAccount(employeeId){
		const queryText = 'DELETE FROM employee WHERE id = $1;'
		return db.query(queryText, [employeeId])
	}

	static getById(employeeId) {
		const queryText = 'SELECT * FROM employee WHERE id = $1;'
		return db.query(queryText, [employeeId])
			.then((data) => data.rows)
	}

    static isAdmin(employeeId) {
		const queryText = 'SELECT is_admin FROM employee WHERE id = $1;'
		return db.query(queryText, [employeeId])
			.then((data) => data.rows)
	}

}

module.exports = Employee