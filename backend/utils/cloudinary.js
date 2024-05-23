import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';


// import { promisify } from 'util'; // Make sure to import `promisify`
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export const uploadToCloudinary = async (fileURI) => {
    try {
        const result = await cloudinary.uploader.upload(fileURI);

        console.log(result.secure_url);
        return {
            url: result.secure_url, // Use secure URL
        };
    } catch (error) {
        throw new Error('Cloudinary upload failed: ' + error.message);
    }
}


/*
Note/Learning : 

The util.promisify function is a convenient way to convert 
a Node.js-style callback function into a Promise-based function.
In the case of the Cloudinary upload function, which uses a
callback-based approach, promisify is being used to convert it 
into a function that returns a Promise, allowing you to use async/await 
for better readability and error handling.
**/