import { User } from '../db/models/users.js'
import jwt from 'jsonwebtoken'

const { KEY_SECRET } = process.env

export const addTokenUser = async id => {
	const token = signToken(id)
	const user = await User.findByIdAndUpdate(id, { token }, { new: true })
	return user
}

export const deletTokenUser = async id => {
	const user = await User.findByIdAndUpdate(id, { token: null })
	return user
}

const signToken = id => {
	return jwt.sign({ id }, KEY_SECRET, { expiresIn: '12h' })
}

export const verifyToken = async token => {
	return await jwt.verify(token, KEY_SECRET)
}
