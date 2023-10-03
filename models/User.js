const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    fname: {
        type: String,
        required: [true, 'Please provide email']
    },
    lname: {
        type: String,
        required: [true, 'Please provide password']
    },
    nname: {
        type: String,
        required: [true, 'Please provide password']
    },
    birthdate: {
        type: Date,
        required: [true, 'Please provide email']
    },
    address: {
        type: String,
        required: [true, 'Please provide password']
    },
    email: {
        type: String,
        required: [true, 'Please provide email']
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    }
})

UserSchema.pre('save', function(next) {
    const user = this

    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash
        next()
    }).catch(error => {
        console.error(error)
    })
})

UserSchema.post('remove', async function (doc) {
    try {
      // Find and delete related data associated with the user
      await RelatedData.deleteMany({ userId: doc._id });
    } catch (error) {
      console.error('Error deleting related data:', error);
    }
  });

const User = mongoose.model('User', UserSchema)
module.exports = User