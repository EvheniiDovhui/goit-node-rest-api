import HttpError from '../helpers/HttpError.js'
import { isValidObjectId } from 'mongoose'
import { Contact } from '../models/contacts.js'

export const isValidId = async (req, res, next) => {
	const { contactId } = req.params

	try {
		if (!isValidObjectId(contactId)) {
			return next(HttpError(400, `Id ${contactId} is not valid`))
		}
		const searchedContact = await Contact.findById(contactId)
		if (!searchedContact) {
			return next(HttpError(404, `Contact with id ${contactId} not found`))
		}
	} catch (err) {
		console.log(err.message)
		return next(new HttpError(500, 'Internal Server Error'))
	}
	next()
}
