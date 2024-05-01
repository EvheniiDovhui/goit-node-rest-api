import HttpError from '../helpers/HttpError.js'
import { isValidObjectId } from 'mongoose'
import { Contact } from '../db/models/contacts.js'

export const isValidId = async (req, _, next) => {
	const { contactId } = req.params

	try {
		if (!isValidObjectId(contactId)) {
			next(HttpError(400, `Id ${contactId} is not valid`))
			return
		}
		const searchedContact = await Contact.findById(contactId)
		if (searchedContact === null) {
			return next(HttpError(404, `Contact with id ${contactId} not found`))
		}
	} catch (err) {
		console.log(err.message)
	}
	next()
}
