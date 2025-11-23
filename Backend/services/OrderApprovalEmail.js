const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

// Create email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendOrderApprovalEmail = async (
  email,
  fullname,
  password,
  trackingId,
  recipientName,
  deliveryCity,
  weight,
  cost
) => {
  try {
    // Simple HTML template if EJS file doesn't exist in Backend
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Approved - SendIT</title>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.5; color: #222; background-color: #FAFAFA; }
              a { color: #000; text-decoration: none; }
              h1 { font-size: 24px; font-weight: 700; text-align: center; margin: 0 0 15px 0; }
              h2 { font-size: 18px; font-weight: 600; color: #0a0e27; }
              p { margin: 0 0 15px 0; }
              .wrapper { max-width: 700px; margin: 0 auto; }
              .header { background-color: #1E1E1E; padding: 30px; color: #fff; }
              .body { padding: 24px; background-color: #fff; }
              .footer { background-color: #E9EB77; padding: 14px; text-align: center; }
              .tracking-box { background-color: #E9EB77; border: 2px solid #D9D964; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
              .tracking-label { color: #0a0e27; font-weight: bold; font-size: 14px; margin-bottom: 8px; }
              .tracking-id { color: #0a0e27; font-size: 20px; font-weight: bold; font-family: monospace; }
              .credentials-box { background-color: #f5f5f5; border-left: 4px solid #E9EB77; padding: 15px; margin: 15px 0; }
              ul { margin: 15px 0; padding-left: 20px; }
              li { margin: 8px 0; }
          </style>
      </head>
      <body>
          <div class="wrapper">
              <div class="header">
                  <h1>🎉 Order Approved!</h1>
              </div>
              
              <div class="body">
                  <p>Hello ${fullname},</p>
                  
                  <p>Great news! Your parcel booking request has been approved by our team and your shipment is now active in our system.</p>

                  <div class="tracking-box">
                      <div class="tracking-label">Your Tracking ID:</div>
                      <div class="tracking-id">${trackingId}</div>
                  </div>

                  <h2>Order Details:</h2>
                  <p><strong>Recipient Name:</strong> ${recipientName}</p>
                  <p><strong>Delivery City:</strong> ${deliveryCity}</p>
                  <p><strong>Weight:</strong> ${weight} kg</p>
                  <p><strong>Cost:</strong> PKR ${cost}</p>

                  <h2>Your Login Credentials:</h2>
                  <div class="credentials-box">
                      <p><strong>Email:</strong> ${email}</p>
                      <p><strong>Password:</strong> ${password}</p>
                      <p><strong>Login URL:</strong> <a href="${process.env.FRONTEND_URL || 'http://localhost:5174'}/login">${process.env.FRONTEND_URL || 'http://localhost:5174'}/login</a></p>
                  </div>

                  <h2>What's Next?</h2>
                  <ul>
                      <li>Log in to your account using the credentials above</li>
                      <li>Use your Tracking ID to monitor your shipment status</li>
                      <li>You'll receive email updates as your parcel moves through our delivery network</li>
                  </ul>

                  <p style="color: #888; font-size: 12px; margin-top: 30px;">
                      Please keep your credentials secure and do not share them with anyone. 
                      If you did not request this shipment, please contact our support team immediately.
                  </p>
              </div>

              <div class="footer">
                  <p style="margin: 0;">If you have any questions, please contact us at <a href="mailto:sendit@outlook.com">sendit@outlook.com</a></p>
              </div>
          </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: `🎉 Your Parcel is Confirmed! Tracking ID: ${trackingId}`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Order approval email sent to ${email}`);
    return true;
  } catch (error) {
    console.error("Error sending order approval email:", error);
    return false;
  }
};

module.exports = { sendOrderApprovalEmail };
