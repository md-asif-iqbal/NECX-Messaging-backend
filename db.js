import mongoose from 'mongoose'

export async function connectDB(uri) {
mongoose.set('strictQuery', true)
await mongoose.connect(uri, {
serverSelectionTimeoutMS: 15000,
autoIndex: true,
})
console.log(' MongoDB connected')
}
