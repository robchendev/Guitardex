import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

async function sendEmail(req, res) {
  try {
    const messageParsed = req.body.message.replaceAll("\n", "<br>");
    await sendgrid.send({
      to: "management@eddievdmeer.com", // Your email where you'll receive emails
      from: "management@eddievdmeer.com", // your website email address here
      subject: `[Guitardex: ${req.body.topic}] ${req.body.subject}`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>Guitardex Contact Form</title>
          <meta name="description" content="Guitardex Contact Form">
        </head>
        <body>
          <p>${req.body.name} (${req.body.email})</p>
          <p>Library: ${req.body.category ?? "None"}</p>
          <p>Module ID: ${req.body.id ?? "None"}</p>
          <p>Message:</p>
          <p>${messageParsed ?? req.body.message}</p>
        </body>
      </html>`,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
  return res.status(200).json({ error: "" });
}

export default sendEmail;
