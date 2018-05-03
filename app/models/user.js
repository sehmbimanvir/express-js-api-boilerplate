import mongoose from 'mongoose'
const Schema = mongoose.Schema

// Create Schema
const userSchema = new Schema({
    first_name: String,
    last_name: String,
    password: String,
    email: String,
    created_at: Date
})

export default mongoose.model('User', userSchema)