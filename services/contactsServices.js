import { Contact } from '../db/models/contacts.js'
import HttpError from '../helpers/HttpError.js'

export const checkOwner = async (contactId, user) => {
	const result = await Contact.findById(contactId)

	const { id } = user

	if (id !== result.owner.toString()) {
		throw HttpError(401, 'Unauthorized')
	}
	return result
}
