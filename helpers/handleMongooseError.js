export const handleMongooseError = err => {
	let message = 'Internal Server Error'
	let statusCode = 500

	if (err.name === 'ValidationError') {
		message = err.message
		statusCode = 400
	} else if (err.name === 'CastError') {
		message = 'Invalid ID'
		statusCode = 400
	}

	return { message, statusCode }
}
