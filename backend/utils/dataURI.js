import DataUriParser from "datauri/parser.js";
import path from "path";

// Create a function to convert a file to a data URI
const getDataUri = (file) => {
    // console.log("file in",file);
    // Create a new instance of DataUriParser
    const parser = new DataUriParser();

    // Get the file extension from the file's original name
    const extName = path.extname(file.originalname).toString();
    console.log("ext",extName);

    // Format the file content as a data URI
    return parser.format(extName, file.buffer);
};

// Export the function
export default getDataUri;
