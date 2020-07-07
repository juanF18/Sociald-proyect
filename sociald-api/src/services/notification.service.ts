import {NotificationDatasource as ND} from '../datasources/notification.datasource';
import {EmailNotification} from '../models';
//const twilio = require('twilio');
const sgMail = require('@sendgrid/mail');

export class NotificationService {
  /*
  async SmsNotification(notificartion: SmsNotification): Promise<boolean> {
    try {
      const accountSid = ND.TWILIO_SID;
      const authToken = ND.TWILIO_AUTH_TOKEN;
      const client = twilio(accountSid, authToken);

      await client.messages
        .create({
          body: notificartion.body,
          from: ND.TWILIO_FROM,
          to: notificartion.to,
        })
        .then((message: any) => {
          console.log(message.sid);
        });
      return true;
    } catch (error) {
      return false;
    }
  }
*/
  async EmailNotification(notification: EmailNotification): Promise<boolean> {
    try {
      sgMail.setApiKey();
      const msg = {
        to: notification.to,
        from: ND.SG_FROM,
        subject: notification.subject,
        text: notification.body,
        html: notification.text,
      };
      console.log(msg);
      await sgMail.send(msg).then(
        (d: any) => {
          console.log(d);
        },
        function (error: any) {
          if (error) {
            console.error(error.message);
          }
        },
      );
      return true;
    } catch (error) {
      return false;
    }
  }
}
