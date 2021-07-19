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

    static createSchedule(employeeId, eventTypes) {
		const queryText = 'INSERT INTO schedule (employee_id, event_type) VALUES ($1, $2);'
		return db.query(queryText, [employeeId, eventTypes])
	}

    static updateSchedule(scheduleId, eventTypes) {
		const queryText = 'UPDATE schedule SET event_types = $2 WHERE id = $1;'
		return db.query(queryText, [scheduleId, eventTypes])
	}

    static deleteSchedule(employeeId){
		const queryText = 'DELETE FROM schedule WHERE employee_id = $1;'
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

    static createTimeslot(scheduleId, timeStart, timeEnd, dateCreated, recurring, availDays, timezone) {
		const queryText = 'INSERT INTO timeslot (schedule_id, time_start, time_end, date_created, recurring, avail_days, timezone) VALUES ($1, $2, $3, $4, $5, $6, $7);'
		return db.query(queryText, [scheduleId, timeStart, timeEnd, dateCreated, recurring, availDays, timezone])
	}

}

module.exports = Employee