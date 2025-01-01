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

exports.signup = async (req,res)=>{
    try {
        //data fetch from request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
            } = req.body

            
        // validate data
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"Please fill all the fields"
            })
        }


        // both password matched or not
        if(password !== confirmPassword){
            return res.status(400).json({
                success:flase,
                message:"Password and Confirm Password does not match"
            })
        }


        // check user already exist or not
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:flase,
                message:"User already exist"
            })
        }                                          
        
        
        // find most recent OTP stored for the user
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1)
        console.log(recentOtp)


        // validate OTP
        if(recentOtp == 0){
            //OTP not found
            return res.status(400).json({
                success:flase,
                message:"OTP Not Found"
            })
        }else if(otp !== recentOtp.otp){
            //Invalid OTP
            return res.status(400).json({
                success:flase,
                message:"Invalid OTP"
            })
        }


        // Has Password
        const hasedPassword = await bcrypt.hash(password,10)


        // Entry create in DB

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hasedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`

        })

        
        // Return response
        return res.status(200).json({
            success:true,
            message:"User is Registered Successfully",
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"User not registerd Try Again"
        })
    }
}


// Login

//changePassword

