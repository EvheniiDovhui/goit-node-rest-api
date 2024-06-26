import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'

import contactsRouter from './routes/contactsRouter.js'
import usersRouter from './routes/usersRouter.js'

import contactsRouter from './routes/contactsRouter.js

const app = express()

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)


app.use((_, res) => {
	res.status(404).json({ message: 'Route not found' })
})

app.use((err, _, res, __) => {
	const { status = 500, message = 'Server error' } = err
	res.status(status).json({ message })
})


export default app
=======
app.listen(3000, () => {
	console.log('Server is running. Use our API on port: 3000')
})
