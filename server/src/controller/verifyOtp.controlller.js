const ErrorHandler = require("../config/ErrorHandler.config");
const otpdb = require("../models/otp.model");
const bcrypt = require("bcryptjs");
const verifyOtp = (req, res, next) => {
  const { otp, contact } = req.body;
  try {
    // find user in otp database
    otpdb.findOne({ contact }).then((result) => {
      if (result?._id) {
        // to verify the opt entered is valid or not
        bcrypt.compare(otp, result.otp, (err, success) => {
          if (err) {
            // if error occured
            next(new ErrorHandler());
          } else {
              if (success) {
                // if otp is valid
              const { updatedAt } = result;
              const dateObject = new Date(updatedAt);
              const second = dateObject.getTime();

              //   to check otp is not expired
              if (Date.now() - second < 600000) {
                  // if otp is not expired i.e within 10min after opt is sent  and then delete the opt after validation
                  otpdb
                  .deleteOne({ contact })
                  .then(({ deletedCount, acknowledged }) => {
                      if (deletedCount > 0 && acknowledged) {
                      res.status(200).send({ msg: "user verified" });
                    }
                  })
                  .catch((err) => {
                    next(new ErrorHandler());
                  });
              } else {
                // if otp is expired i.e after 10min
                res.status(400).json({ msg: "Otp Expired" });
              }
            } else {
              // if otp entered by user is invalid
              res.status(406).send({ msg: "Incorrect Otp" });
            }
          }
        });
      } else {
        // if no data exists in database about user and its corrosponding otp
        res.status(404).send({ msg: "Invalid Otp" });
      }
    });
  } catch (err) {
    next(new ErrorHandler());
  }
};
module.exports = verifyOtp;
