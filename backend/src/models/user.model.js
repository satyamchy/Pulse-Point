const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        profile: {
            bio: { type: String },
            profile: { type: String , default:"https://cdn-icons-png.flaticon.com/128/3177/3177440.png"}
        },
        role: {
            type: String,
            enum: ["user", "reader", "writer", "admin"],
            default: "user"
        },
        gender: {
            type: String,
            enum: ['male', 'famale', 'Prefer not to say'],
            default: "Prefer not to say"
        },
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Author'
            }
        ],
        savedArticle: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Article"
            }
        ],
        myReads: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Article"
            }
        ],
    },
    { timestamps: true }
)

const User = mongoose.model('User', userSchema);
module.exports = User