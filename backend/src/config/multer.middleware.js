const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (res, file, cb) => {
        //console.log(file);
        // if (user == "admin") {
        cb(null, "./public/media");
        // } else if (user == "student") {
        //     cb(null, __dirname + "/public/student");
        // }
        // else {
        //     cb(null, __dirname + "/public/files");
        // }
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Get the file extension
        console.log(ext)
        const baseName = path.basename(file.originalname, ext);
        console.log(baseName)
        var name = baseName +"-" + Date.now() + ext;
        console.log(name)
        //var name =  Date.now() + ".jpg";
        cb(null, name);
    }
});
const filter = (req, file, cb) => {
    console.log(file);
    var ext = file.mimetype.split("/")[1];
    if (ext == "jpeg" || ext == "png" || ext == "jpg" || ext == "webp") {
        cb(null, true);
    } else {
        cb(new Error("not supported"), false);
    }
}
//const upload = multer({dest:__dirname+"/public"})
const maxSize = 1 * 1024 * 1024   // 1MB
const upload = multer({ storage: storage, fileFilter: filter, limits: { fileSize: maxSize } });

// sample of how request is splitted in routes
//for handle multiple fields 
// app.post("/filelds",upload.fields([{name:"pic",maxCount:1},{name:"pic1",maxCount:1}]),(req,res)=>{
//     console.log(req.body);
//     console.log(req.files);
//       res.end("multiple fields recived");
//   })
module.exports =  upload;


