import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import contactsRouter from './routes/contactsRouter.js'

dotenv.config()
const { MONGODB_URL, PORT = 3000 } = process.env

const app = express()

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((_, res) => {
	res.status(404).json({ message: 'Route not found' })
})

app.use((err, _, res, __) => {
	const { status = 500, message = 'Server error' } = err
	res.status(status).json({ message })
})
mongoose.set('strictQuery', true)

mongoose
	.connect(MONGODB_URL)
	.then(() => {
		console.log('Database connection successful')
		app.listen(PORT, () => {
			console.log(`Server running. Use our API on port: ${PORT}`)
		})
	})
	.catch(err => {
		console.log(err.message)
		process.exit(1)
	})
