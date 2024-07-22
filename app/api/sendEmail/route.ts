import nodemailer from 'nodemailer';

// Create a transporter object
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use the appropriate email service
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});

// Define the mailOptions
const mailOptions = {
    from: `Auras' shop <${process.env.APP_EMAIL}>`,
    to: "happy222004567@gmail.com",
    subject: "Welcome to Auras' Shop",
    text: "Welcome to Auras' Shop! We are excited to have you.",
    html: `<h1>Welcome to Auras' Shop!</h1>
           <p>We are excited to have you.</p>
           <p>Thank you for joining us. If you have any questions, feel free to contact us.</p>
           <p>Best regards,<br />Auras' Shop Team</p>`,
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Email sent: ' + info.response);
});
