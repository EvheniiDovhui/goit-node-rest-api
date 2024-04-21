import HttpError from '../helpers/HttpError.js'
import { Contact } from '../models/contacts.js'

export const getAllContacts = async (_, res, next) => {
	try {
		const result = await Contact.find()
		if (!result.length) {
			throw HttpError(404, 'There is no contact')
		}
		res.json(result)
	} catch (err) {
		next(err)
	}
}

export const getOneContact = async (req, res, next) => {
	try {
		const searchedId = req.params.contactId
		const result = await Contact.findById(searchedId)
		res.json(result)
	} catch (err) {
		next(err)
	}
}

export const deleteContact = async (req, res, next) => {
	try {
		const result = await Contact.findByIdAndRemove(req.params.contactId)
		res.json(result)
	} catch (err) {
		next(err)
	}
}

export const createContact = async (req, res, next) => {
	try {
		const result = Contact.create(req.body)
		res.status(201).json(result)
	} catch (err) {
		next(err)
	}
}

export const updateContact = async (req, res, next) => {
	try {
		const result = await Contact.findByIdAndUpdate(
			req.params.contactId,
			req.body,
			{ new: true }
		)
		res.json(result)
	} catch (err) {
		next(err)
	}
}

export const updateStatusContact = async (req, res, next) => {
	try {
		const result = await Contact.findByIdAndUpdate(
			req.params.contactId,
			req.body,
			{ new: true }
		)
		res.json(result)
	} catch (err) {
		next(err)
	}
}
