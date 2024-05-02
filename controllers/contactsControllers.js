import HttpError from '../helpers/HttpError.js'

import { Contact } from '../db/models/contacts.js'
import { checkOwner } from '../services/contactsServices.js'

export const getAllContacts = async (req, res, next) => {
	try {
		const { _id } = req.user
		const { page = 1, limit = 20 } = req.query
		const skip = (page - 1) * limit
		const result = await Contact.find({ owner: _id }, '', {
			skip,
			limit: Number(limit),
		}).populate('owner', '_id email')

import {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContactById,
} from '../services/contactsServices.js'

export const getAllContacts = async (_, res, next) => {
	try {
		const result = await listContacts()

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
		const result = await checkOwner(searchedId, req.user)


		const result = await getContactById(req.params.id)
		res.json(result)
	} catch (err) {
		next(err)
	}
}

export const deleteContact = async (req, res, next) => {
	try {
		const result = await removeContact(req.params.id)

		res.json(result)
	} catch (err) {
		next(err)
	}
}


export const deleteContact = async (req, res, next) => {
	try {
		const searchedId = req.params.contactId

		const { id } = await checkOwner(searchedId, req.user)

		const result = await Contact.findByIdAndDelete(id)
		res.json(result)
	} catch (err) {
		next(err)
	}
}

export const createContact = async (req, res, next) => {
	try {
		const { _id } = req.user
		const result = await Contact.create({ ...req.body, owner: _id })
		res.status(201).json(result)
	} catch (err) {
		next(err)
	}
}

export const updateContact = async (req, res, next) => {
	try {
		const searchedId = req.params.contactId

		const { id } = await checkOwner(searchedId, req.user)
		const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })
		res.json(result)
	} catch (err) {
		next(err)
	}
}

export const updateStatusContact = async (req, res, next) => {
	try {
		const searchedId = req.params.contactId
		const { id } = await checkOwner(searchedId, req.user)

		const result = await Contact.findByIdAndUpdate(id, req.body, {
			new: true,
		})

export const createContact = async (req, res, next) => {
	try {
		const { name, email, phone } = req.body
		const result = await addContact(name, email, phone)
		res.status(201).json(result)
	} catch (err) {
		next(err)
	}
}

export const updateContact = async (req, res, next) => {
	try {
		const result = await updateContactById(req.params.id, req.body)

		res.json(result)
	} catch (err) {
		next(err)
	}
}
