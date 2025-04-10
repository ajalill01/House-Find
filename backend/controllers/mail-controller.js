const nodemailer = require('nodemailer');

const sendEmail = (req, res) => {
    try {
        const { fullName, email, subject, message } = req.body;

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: subject,
            text: `From ${fullName} \n${message}` 
        };

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: 'Error sending email'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Email sent successfully'
            });
        });
    } catch (e) {
        console.log('Error from sendEmail\n', e);
        res.status(500).json({
            success: false,
            message: 'Error processing request'
        });
    }
};


module.exports = sendEmail

