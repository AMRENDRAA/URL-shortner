const mongoose = require('mongoose');

// {
//   originalUrl,
//   shortCode,
//   clicks,
//   createdAt,
//   updatedAt
// }

const UrlModel = mongoose.Schema({

    originalUrl: {
        type: String,
        required: [true, "Please provide the URL"],
        trim: true,
        validate: {
            validator: function (value) {
                // Enforces structural integrity (requires valid protocol like http/https and domain)
                return URL.canParse(value);
            }



        }

    },
    shortCode: {
        type: String,
        unique: true

    },
    clicks: {
        type: Number,
        default: 0
    },
    visitHistory: [],
},

    {
        timestamps: true
    }



);

module.exports = mongoose.model("UrlModel", UrlModel);



