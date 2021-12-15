const nodemailer = require('nodemailer');
const {Logger} = require("./logger");
const AdminMail=""
const AdminPassword =""


async function SendTextEmail (receiverMail,text,subject)
{
    await SendMail(receiverMail,text,subject)       
}

async function SendMail(receiver,text,subject){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: AdminMail ,
            pass:AdminPassword
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
        });
    
        let mailOptions = {
            from: AdminMail,
            to: receiver,
            subject: subject,
            html: text
            };
    
        transporter.sendMail(mailOptions, (error, response) => {
                if (error) {
                Logger.error("Email failed to send",error)
                return
                }else{
                    Logger.info("sent",res)
                }

                });

}

var Mailer = {SendTextEmail}

module.exports = Mailer