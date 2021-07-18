import db from '../database/db'

class Business {

	static createAccount(name, email, phone_number, business_address, profileImageUrl) {
		const queryText = 'INSERT INTO business (name, email, phone_number, business_address, profile_image_url) VALUES ($1, $2, $3, $4, $5);'
		return db.query(queryText, [name, email, phone_number, business_address, profileImageUrl])
	}

	static updateAccount(businessId, name, email, phone_number, business_address, profileImageUrl){
		const queryText = 'UPDATE business SET name = $2, email = $3, phone_number = $4, business_address = $5, profile_image_url = $6 WHERE id = $1;'
		return db.query(queryText,[businessId, name, email, phone_number, business_address, profileImageUrl])
			.then((data) => data.rows)
	}

	static deleteAccount(businessId){
		const queryText = 'DELETE FROM business WHERE id = $1;'
		return db.query(queryText, [businessId])
	}

	static getById(businessId) {
		const queryText = 'SELECT * FROM business WHERE id = $1;'
		return db.query(queryText, [businessId])
			.then((data) => data.rows)
	}

    static getAllAdmins(businessId) {
		const queryText = 'SELECT * FROM employee WHERE is_admin = true AND business_id = $1;'
		return db.query(queryText, [businessId])
			.then((data) => data.rows)
	}

    static getAllEmployees(businessId) {
		const queryText = 'SELECT * FROM employee WHERE business_id = $1;'
		return db.query(queryText, [businessId])
			.then((data) => data.rows)
	}

	static getAllBusinesses() {
		const queryText = 'SELECT * FROM business;'
		return db.query(queryText)
			.then((data) => data.rows)
	}
}

module.exports = Business