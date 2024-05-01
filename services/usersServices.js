import { User } from '../db/models/users.js'
import jwt from 'jsonwebtoken'

const { KEY_SECRET } = process.env

const signToken = id => {
	return jwt.sign({ id }, KEY_SECRET, { expiresIn: '14h' })
}

export const verifyToken = async token => {
	return await jwt.verify(token, KEY_SECRET)
}

export const createUser = async userData => {
	const newUser = new User(userData)
	await newUser.hashPassword()
	await newUser.save()
	return newUser
}

export const findUserByEmail = async email => {
	const user = await User.findOne({ email })
	return user
}

export const addTokenUser = async id => {
	const token = signToken(id)
	const user = await User.findByIdAndUpdate(id, { token }, { new: true })
	return user
}

export const deletTokenUser = async id => {
	const user = await User.findByIdAndUpdate(id, { token: null })
	return user
}

export const changeSubscription = async (id, userData) => {
	const user = await User.findByIdAndUpdate(id, userData, { new: true })
	return user
}
