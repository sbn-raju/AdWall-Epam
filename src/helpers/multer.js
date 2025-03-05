const multer = require("multer");
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {

      // Destination of it where documents should be stored
      //Adding the final address to the path.
      const dirPath = path.join(__dirname, "../public/images");
  
      //Check if the directory exists, if not, create it.
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
  
      cb(null, dirPath);
  
    },
    filename: function (req, file, cb) {
    //Getting the user id from the middleware.
    // const user_id = req.user.id;
    const user_id = req?.user?.id

      console.log(file);
      const name = user_id + "-" + file.originalname
      cb(null, name)
    }
})


const upload = multer({
    storage: storage,
});

module.exports = upload