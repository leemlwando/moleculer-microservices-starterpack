const maxFileSize = process.env.MAX_FILE_SIZE || 0; // in bytes, 0 for unlimited


module.exports = function isValid(size) {
    return maxFileSize === 0 || size < maxFileSize;
}