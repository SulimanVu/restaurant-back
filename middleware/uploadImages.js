const multer = require("multer");
const dayjs = require("dayjs");


console.log(dayjs().format('DDMMYYYY-HHmmss_SSS'));
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "files/");
    },
    filename(req, file, callback) {
        const date = dayjs().format('DDMMYYYY-HHmmss_SSS')
        callback(null, `${date}-${file.originalname}`)
    }
});

const types = ['image/png', 'image/jpeg', 'image/jpg']

const filefilter = (req, file, callback) => {
    if (types.includes(file.mimetype)) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}

const limits = {
    filesize: 1024 * 1024 * 5
}

module.exports = multer({storage, filefilter, limits});