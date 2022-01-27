const imageFilter=(req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)){
        req.fileValidationError='only images files';
        return cb(new Error('only images are allow'),false);
    }
    cb(null,true);
}
exports.imageFilter=imageFilter;