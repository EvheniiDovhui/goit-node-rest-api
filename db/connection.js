import { connect } from 'mongoose'

const { MONGODB_URL } = process.env

export const connectDB = async () => {
	try {
		await connect(MONGODB_URL)
		console.log('Database connection successful')
	} catch (err) {
		console.log(err)
	}
}
