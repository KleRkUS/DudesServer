import {Transporter} from "nodemailer";

const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
import {mailerConfig} from "../../core/config/mail";
import {Dudes} from "../../core/Dudes.d/dudes";

interface registrationMailData {
    username:string,
    email:string,
    link:string
}

interface MailSenderParams {
    transporter:Transporter,
    mailData:object
}



const templateOptions:object = {
    viewEngine: {
        partialsDir: __dirname + "../views/partials",
        layoutsDir: __dirname + "../views/layouts",
        extname: ".hbs"
    },
    extName: ".hbs",
    viewPath: "views"
}

const transporter:Transporter = nodemailer.createTransport({
    port: mailerConfig.port,
    host: mailerConfig.host,
    auth: {
        user: mailerConfig.auth.user,
        pass: mailerConfig.auth.pass
    },
    secure: mailerConfig.secure
});

transporter.use("compile", hbs(templateOptions));



const sendMail = async ({transporter, mailData}:MailSenderParams):Promise<Dudes.MailStatus> => {
    try {
        await transporter.sendMail(mailData);
        return {status: true, context: "Email sent!"}
    } catch (e:any) {
        return {status: false, context: e}
    }
}

exports.sendRegistrationConfirmationEmail = async ({username, email, link}:registrationMailData):Promise<Dudes.MailStatus> => {
    const emailContext:object = {
        username: username,
        link: link
    };

    const mailData:object = {
        from: mailerConfig.auth.user,
        to: email,
        subject: "Dudes registration confirmation",
        template: "MailTemporaryConfirmation",
        context: emailContext
    }

    return await sendMail({transporter, mailData});
}