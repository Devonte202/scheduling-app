import db from '../database/db'

class Customer {

	static createAccount(firstName, lastName, email, phoneNumber) {
		const queryText = 'INSERT INTO business (first_name, last_name, email, phone_number) VALUES ($1, $2, $3, $4);'
		return db.query(queryText, [firstName, lastName, email, phoneNumber])
	}

	static updateAccount(customerId, firstName, lastName, email, phoneNumber) {
		const queryText = 'UPDATE customer SET first_name = $2, last_name = $3, email = $4, phone_number = $5 WHERE id = $1;'
		return db.query(queryText,[customerId, firstName, lastName, email, phoneNumber])
			.then((data) => data.rows)
	}

	static deleteAccount(customerId) {
		const queryText = 'DELETE FROM customer WHERE id = $1;'
		return db.query(queryText, [customerId])
	}

	static getById(customerId) {
		const queryText = 'SELECT * FROM customer WHERE id = $1;'
		return db.query(queryText, [customerId])
			.then((data) => data.rows)
	}

    static getAllAppointments(customerId) {
		const queryText = 'SELECT * FROM apppointment WHERE customer_id = $1;'
		return db.query(queryText, [customerId])
			.then((data) => data.rows)
	}

}

module.exports = Customer
