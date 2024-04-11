import HttpError from '../helpers/HttpError.js'
import { checkEmptyUpdtObj } from '../midleWare/checkEmptyUpdtObj.js'
import { checkResponse } from '../midleWare/checkResponse.js'
import { Contact } from '../models/contact.js'

export const getAllContacts = async (_, res) => {
	try {
		const result = await Contact.find()
		if (!result || !result.length) {
			res.json({ message: 'Database is empty' })
		} else {
			res.json(result)
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

export const getOneContact = async (req, res, next) => {
	const { id } = req.params
	try {
		const result = await Contact.findById(id)
		checkResponse(result, next)
		res.json(result)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

export const deleteContact = async (req, res, next) => {
	const { id } = req.params
	try {
		const contactToRemove = await Contact.findByIdAndDelete(id)
		checkResponse(contactToRemove, next)
		res.json(contactToRemove)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

export const createContact = async (req, res, next) => {
	try {
		const newContact = await Contact.create(req.body)
		checkResponse(newContact, next)
		res.status(201).json(newContact)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export const updateContact = async (req, res, next) => {
	const { id } = req.params
	const { ...restParams } = req.body
	checkEmptyUpdtObj(restParams, next)
	try {
		const updatedContact = await Contact.findByIdAndUpdate(
			id,
			{ ...restParams },
			{ new: true }
		)
		checkResponse(updatedContact, next)
		res.status(200).json(updatedContact)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export const updateStatusContact = async (req, res, next) => {
	const { contactId } = req.params
	const { favorite } = req.body
	try {
		const updatedContact = await Contact.findByIdAndUpdate(
			contactId,
			{ favorite },
			{ new: true }
		)
		if (!updatedContact) {
			next(HttpError(404))
			return
		}
		res.status(200).json(updatedContact)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
