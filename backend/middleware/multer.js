import multer from 'multer';

// Create separate storage configurations for profile picture and group picture uploads
const profilePicStorage = multer.memoryStorage(); // Modify as needed (e.g., disk storage)
const groupPicStorage = multer.memoryStorage(); // Modify as needed (e.g., disk storage)

// Create upload instances with the corresponding storage configurations
// For profile pictures
const uploadProfilePic = multer({ storage: profilePicStorage }).single('profilePic');

// For profile pictures
const updateProfilePic = multer({ storage: profilePicStorage }).single('updateProfilePic');

// For group pictures
const uploadGroupPic = multer({ storage: groupPicStorage }).single('groupPic');

// Export the upload instances
export { uploadProfilePic, uploadGroupPic , updateProfilePic};