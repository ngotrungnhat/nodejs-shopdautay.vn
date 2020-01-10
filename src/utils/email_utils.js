import nodemailer from "nodemailer"
import configData from "./config"

class EmailUtils {

    static async sendOneMail(receiver, email) {
        const { username, password } = configData.email_sender
        
        const transport = this.getTransport(username, password)
        const mailOption = this.getMailOption(username, receiver, email)

        const info = await transport.sendMail(mailOption).catch(error => {
            console.error("error", error)
        })
        console.log("info", info)
    }

    static getTransport(username, password) {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: username,
                pass: password
            }
        })
        return transport
    }

    static getMailOption(sender, receiver, email) {
        const { subject, content, attachments } = email
        const mailOption = {
            from: sender,
            to: receiver,
            subject: subject,
            text: content,
            attachments: attachments
        }

        return mailOption
    }

}

export default EmailUtils;