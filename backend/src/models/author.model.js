const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type:String,
            enum: ["reader", "writer", "author", "admin"],
            default: "reader"
        },
        profile: {
            bio: { type: String },
            profile: { type: String , default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"}
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Prefer not to say"],
            default: "Prefer not to say",
        },
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        myArticles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Article"
            }
        ],
        managedAuthors: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Author"
            }
        ]   // authors being managed by admin
    },
    { timestamps: true }
)
 const Author = mongoose.model('Author', authorSchema)
module.exports = Author