import express from 'express'
import {
	getAllContacts,
	getOneContact,
	deleteContact,
	createContact,
	updateContact,

	updateStatusContact,

} from '../controllers/contactsControllers.js'
import {
	createContactSchema,
	updateContactSchema,

	updateFavoriteSchema,
} from '../schemas/contactsSchemas.js'

import validateBody from '../helpers/validateBody.js'
import { isValidId } from '../middleware/isValidId.js'
import { isAuthorizedUser } from '../middleware/isAuthorizedUser.js'

const contactsRouter = express.Router()

contactsRouter.get('/', isAuthorizedUser, getAllContacts)

contactsRouter.get('/:contactId', isAuthorizedUser, isValidId, getOneContact)

contactsRouter.delete('/:contactId', isAuthorizedUser, isValidId, deleteContact)

contactsRouter.post(
	'/',
	isAuthorizedUser,
	validateBody(createContactSchema),
	createContact
)

contactsRouter.put(
	'/:contactId',
	isAuthorizedUser,
	isValidId,
	validateBody(updateContactSchema),
	updateContact
)

contactsRouter.patch(
	'/:contactId/favorite',
	isAuthorizedUser,
	isValidId,
	validateBody(updateFavoriteSchema),
	updateStatusContact

} from '../schemas/contactsSchemas.js'
import validateBody from '../helpers/validateBody.js'
import { checkForId } from '../middleware/checkForId.js'

const contactsRouter = express.Router()

contactsRouter.get('/', getAllContacts)

contactsRouter.get('/:id', checkForId, getOneContact)

contactsRouter.delete('/:id', checkForId, deleteContact)

contactsRouter.post('/', validateBody(createContactSchema), createContact)

contactsRouter.put(
	'/:id',
	checkForId,
	validateBody(updateContactSchema),
	updateContact

)

export default contactsRouter
