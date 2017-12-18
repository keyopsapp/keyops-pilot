const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
const transporter  = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'account@gmail.com ',
        pass: 'pass'
    }
});


module.exports = {
    send: function (address, survey) {

        var url = `http://localhost:3000/display/${survey.id}`;

        let mailOptions = {
            from: 'contact@keyops.com', // sender address
            to: address, // list of receivers
            subject: `Survey ${survey.name} is ready!`, // Subject line
            html: `<p>Please share the following link with the relevant participants:</p><a href="${url}">${url}</a> </p>`// plain text body
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    }
}