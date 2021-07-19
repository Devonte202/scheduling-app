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

    static getAppointmentById(customerId, appointmentId) {
		const queryText = 'SELECT * FROM appointment WHERE customer_id = $1 AND id = $2;'
		return db.query(queryText, [customerId, appointmentId])
			.then((data) => data.rows)
	}

    static getAllAppointments(customerId) {
		const queryText = 'SELECT * FROM appointment WHERE customer_id = $1;'
		return db.query(queryText, [customerId])
			.then((data) => data.rows)
	}
    
    static createAppointment(timeslotId, customerId, employeeId, apptTime, details, eventType, reserved, isVirtual, apptLocation) {
		const queryText = 'INSERT INTO appointment (timeslot_id, customer_id, employee_id, appt_time, details, event_type, reserved, is_virtual, appt_location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);'
		return db.query(queryText, [timeslotId, customerId, employeeId, apptTime, details, eventType, reserved, isVirtual, apptLocation])
			.then((data) => data.rows)
	}

    static deleteAppointment(customerId, appointmentId) {
		const queryText = 'DELETE FROM appointment WHERE customer_id = $1 AND id = $2;'
		return db.query(queryText, [customerId, appointmentId])
	}

}

module.exports = Customer
