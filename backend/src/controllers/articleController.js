const Article = require('../models/article.model.js');
const Author  = require('../models/author.model.js');
// const User = require('../models/user.model.js')

//endpoints for author 
const createArticle = async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.files)
        // console.log(req.name)
        // console.log(req.userId)
        const { title, description, content, tags, action} = req.body;
        const {image, video} = req.files;
        if (!title || !description || !content || !tags || !action ) {
            return res.status(400).json({
                message: "All fields are mandatory",
                success: false
            })
        }
        //const images = req.files.image ? req.files.image.map(file => file.path) : [];
        const images = req.files.image? req.files.image.map(file=> file.path) : [];
        const media  =  req.files.video? req.files.video.map(file=> file.path) : [];

        const obj = { title, description, content, tags, ...(images && { image: images }), ...(video && {media: media }), authorId:req.userId, authorName:req.name, status: action };
        const articleCreated = await new Article(obj).save();
           
       await Author.findByIdAndUpdate(req.userId, { $push: { articles: articleCreated._id } })

        console.log(articleCreated)
        return res.status(201).json({
            message: "Article created successfully...",
            article: articleCreated,
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }
}
const editArticle = async (req, res) => {
    try {
        const id = req.params.id;
        const article = await Article.findById(id);
        if (article) {
            return res.status(200).json({
                article: article,
                success: true
            })
        }
    } catch (error) {
        console.log(error)
    }
}
const deleteArticle = async (req, res) => {
    try {
        const id = req.params.id;
        const article = await Article.findByIdAndDelete(id);
        await Author.findByIdAndDelete()
        if (article) {
            console.log("article deleted successfully")
            return res.status(200).json({
                message: "Article deleted successfully...",
                success: true
            })
        }
    } catch (error) {
        console.log(error)
    }
}
const authorAllArticles = async (req, res) => {
    try {
        const authorId = req.params.id;  //author id
       // console.log(authorId)
        const articles = await Article.find({authorId})//.populate("articles");
        //console.log(articles)
        return res.status(200).json({
            articles,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}
const getArticle = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id)
        const article = await Article.findById(id);
        // console.log(article)
        return res.status(200).json({
            article: article
        })
    } catch (error) {
        console.log(error)
    }
}
const getAllArticles = async (req, res) => {
    try {
        const allArticles = await Article.findById();
        //console.log(allArticles)
        return res.status(200).json({
            articles: allArticles
        })
    } catch (error) {
        console.log(error)
    }
}

const getFollowingAuthorArticles = async (req, res) => {
    try {
        const id = req.params.id;  // user  id
        const loggedInUser = await User.findById(id);
        const followingUserArticle = await Promise.all(loggedInUser.following.map((e) => {
            return Article.find({ author: e });
        }))
        return res.status(200).json({
            atricles: followingUserArticle
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createArticle,
    deleteArticle,
    editArticle,
    authorAllArticles,
    getArticle,

    getAllArticles,
    getFollowingAuthorArticles,

}