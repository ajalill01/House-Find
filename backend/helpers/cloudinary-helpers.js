const cloudinary = require('../config/cloudinary')

const uploadToCloudinary = async(filePaths)=>{
    try{
        
        const results = await Promise.all(
            filePaths.map(filePath => cloudinary.uploader.upload(filePath))
        )

        return results.map(result =>({
            url:result.secure_url,
            publicId:result.public_id
        }))

    }
    catch(e){
        console.log('Error while uploading to cloudinary',e)
        throw new Error('Error while uploading to cloudinary')
    }
}

module.exports = {
    uploadToCloudinary
}