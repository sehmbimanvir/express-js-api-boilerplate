import mongoose from 'mongoose'
const Schema = mongoose.Schema

/**
 * Create User Schema
 */
const userSchema = new Schema({
    first_name: String,
    last_name: String,
    password: String,
    email: {
        type: String,
        unique: true
    },
    created_at: Date
})
/**
 * Mongoose Pre Save
 */
userSchema.pre('save', function (next) {
    this.created_at = new Date()
    next()
})
export default mongoose.model('User', userSchema)