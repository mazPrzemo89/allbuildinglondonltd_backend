const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY2)

exports.sendEmail = (req, res) => {
  console.log(req.body)
  let name = req.body.name
  let phone = req.body.phone
  let email = req.body.email
  let message = req.body.message

  if (message.length > 400) {
    res.status(400).json('Message cannot be longer than 400 characters.')
  }
  const msg = {
    to: 'email@email.com', // Change to your recipient
    from: 'email@email.com', // Change to your verified sender
    subject: `Name: ${name}  Phone: ${phone} Email: ${email}`,
    text: message,
  }

  sgMail
    .send(msg)
    .then(() => {
      return res.status(200).json('Message sent')
    })
    .catch((error) => {
      return res.status(400).json(error)
    })
}
