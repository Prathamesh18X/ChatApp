import multer from 'multer';

// Create a storage configuration using multer
const storage = multer.memoryStorage();

// Create an upload instance with the storage configuration
const upload = multer({ storage }).single('profilePic');

export default upload;
