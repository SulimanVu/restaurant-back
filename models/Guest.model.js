const mongoose = require('mongoose');

const guestSchema = mongoose.Schema({
    role: {
        type: String,
        default: 'guest'
    }
})

const Guest = mongoose.model('Guest', guestSchema)

module.exports = Guest