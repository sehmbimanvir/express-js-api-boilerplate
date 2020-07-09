import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const validateEmail = email => {
  var re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};


const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: 'String',
    required: true,
    trim: true
  },
  email: {
    type: 'String',
    required: true,
    trim: true,
    unique: true,
    validate: [validateEmail, 'Please enter valid email address']
  },
  password: { type: 'String', trim: true },
  reset_token: { type: 'String' },
  token: { type: 'String' }
}, {
  timestamps: { createdAt: 'created_at' }
})

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
  next()
})

export default mongoose.model('User', UserSchema)