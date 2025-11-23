const ejs = require("ejs");
const path = require("path");
const dotenv = require("dotenv");
const sendMail = require("../helpers/sendMail");

dotenv.config();

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
    const templatePath = path.join(__dirname, "../templates/orderapproval.ejs");
    
    ejs.renderFile(
      templatePath,
      {
        fullname: fullname,
        email: email,
        password: password,
        trackingId: trackingId,
        recipientName: recipientName,
        deliveryCity: deliveryCity,
        weight: weight,
        cost: cost,
        loginUrl: process.env.FRONTEND_URL + "/login"
      },
      async (err, data) => {
        if (err) {
          console.error("Error rendering template:", err);
          return;
        }

        const messageOption = {
          from: process.env.EMAIL,
          to: email,
          subject: `🎉 Your Parcel is Confirmed! Tracking ID: ${trackingId}`,
          html: data,
        };

        try {
          await sendMail(messageOption);
          console.log(`Order approval email sent to ${email}`);
        } catch (error) {
          console.error("Error sending order approval email:", error);
        }
      }
    );
  } catch (error) {
    console.error("Error in sendOrderApprovalEmail:", error);
  }
};

module.exports = { sendOrderApprovalEmail };
