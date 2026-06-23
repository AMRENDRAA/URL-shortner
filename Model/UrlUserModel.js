const mongoose = require('mongoose');

const UrlUsersSchema = mongoose.Schema({

    Username: {
        type: String,
        unique: true,
        minlength: [3, 'Username should be of atleast 3 char']


    },

    Password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [5, 'Please provide the password of atleast 5 chars'],
        match: [
            /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
            'Password must contain at least one uppercase letter and one special character'
        ]


    }
}, 


{
    timestamps: true
})

module.exports = mongoose.model("UrlUsersSchema", UrlUsersSchema);
