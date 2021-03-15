const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: Array, required: false, default: [] },
    role: { type: String, default: 'customer' },
},{
    timestamps: true
}
)

const User = mongoose.model('User', userSchema)

module.exports = User