const nodemailer = require("nodemailer")

const mailSender = async (email,title,body) =>{
    try {
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                password:process.env.MAIL_PASS
            }
        })

        let info = await transporter.sendMail({
            from:"studyNotion",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        cconsole.log(info)
        return info
        
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = mailSender