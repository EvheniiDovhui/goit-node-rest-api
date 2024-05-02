import Joi from 'joi'

export const createContactSchema = Joi.object({
	name: Joi.string().required(),

	email: Joi.string().email().required(),
	phone: Joi.string().required(),
	favotite: Joi.boolean(),

	email: Joi.string().required(),
	phone: Joi.string().required(),

})

export const updateContactSchema = Joi.object({
	name: Joi.string(),

	email: Joi.string().email(),
	phone: Joi.string(),
})

export const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
})

	email: Joi.string(),
	phone: Joi.string(),
})

