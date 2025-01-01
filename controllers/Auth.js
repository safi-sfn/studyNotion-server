const User = require("../models/User")
const OTP = require("../models/OTP")
const otpGenerator = require("otp-generator")

// send OTP
const sendOTP = async (req,res) => {
        try {
            // fetch email from request body
            const {email} = req.body

            // check user exist or not
            const checkUserPresent = await User.findOne({email})

            //if user exist then rerurn response
            if(checkUserPresent){
                return res.status(401).json({
                    success:true,
                    message:"User exist"
                })
            }

            //generate OTP
            let otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                specialChars:false,
                lowerCaseAlphabets:false,
            
            })
            console.log("OTP is :-",otp)

            //check unique otp or not
            const result = await OTP.findOne({otp:opt})
            
            while(result){
                otp = otpGenerator(6,{
                    upperCaseAlphabets:false,
                    specialChars:false,
                    lowerCaseAlphabets:false,
                })
                const result = await OTP.findOne({otp:opt})
            }

            const otpPayload = {email,otp}
            
            //create an entry in DB fro OTP
            const otpBody = await OTP.create(otpPayload)
            console.log(otpBody)
            res.status(200).json({
                success:true,
                message:"OTP send Successfully",
                otp
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                success:flase,
                message:error.message
            })            
        }
}



// signup


// Login

//changePassword

