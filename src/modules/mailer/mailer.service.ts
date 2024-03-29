import { Injectable } from "@nestjs/common";
import {Transporter, createTransport} from 'nodemailer'
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { mailOption, sendMailFn } from "./interface/mailer.interface";
import * as Mailgen from "mailgen";

console.log(Mailgen);


@Injectable()
export class mailService{
    private transporter:Transporter<SMTPTransport.SentMessageInfo> = createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_ACCOUNT,
          pass: process.env.MAIL_PASS
        }
      });

       sendMail:sendMailFn = async (
        to:string, 
        subject:string, 
        html?:string,
        from:string = process.env.MAIL_ACCOUNT
        ):Promise<boolean> =>{
        try {
            let sendMailOption:mailOption = {
              from,
              to,
              subject,
              html
            }
            await this.transporter.sendMail(sendMailOption);
            console.log("gui mail thanh cong");
            
            return true
        } catch (error:any) {
          console.log("error",error);
          
            return false
        }
      }
}

//mail Đăng ký
export const emailTemplates = {
  emailVerify:(userName:string , verifyLink:string):string=>{
    let mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'PhoneShop',
        link: 'https://khangdev.io.vn/'
    }
    })

    var email = {
      body: {
          name: userName,
          intro: 'Cảm ơn bạn đã đến với PhoneShop! Chúng tôi rất mong chờ được đồng hành cùng bạn trong những chuyến hành trình sắp tới.',
          action: {
              instructions: 'Để xác thực email và sở hữu trọn vẹn chức năng của PhoneShop xin hãy nhấn vào đây:',
              button: {
                  color: '#529EAB', // Optional action button color
                  text: 'Xác thực email',
                  link: verifyLink
              }
          },
          outro: 'Nếu gặp bất cứ vấn đề gì khi xác thực, xin hãy trực tiếp phản hồi thông qua địa chỉ email này, chúng tôi sẽ liên hệ đến bạn trong thời gian sớm nhất!'
      }
  };
  var emailBody = mailGenerator.generate(email);
  return emailBody
  }
}

//mail khôi phục mật khẩu
export const resetPWTemplate = {
  resetPWNotify:(userName:string , newPasswords:string):string=>{
    let mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'PhoneShop',
        link: 'https://khangdev.io.vn/'
    }
    })

    var email = {
      body: {
          name: userName,
          intro: `Mật khẩu mới của bạn là : ${newPasswords}`,
          action: {
              instructions: `mật khẩu đã khôi phục thành công , mời quý khách đăng nhập với mật khẩu trên và thay đổi mật khẩu để tránh bị đánh mất`,
              button: {
                  color: '#529EAB', // Optional action button color
                  text: 'Đăng nhập',
                  link: 'https://khangdev.io.vn/auth'
              }
          },
          outro: 'Nếu gặp bất cứ vấn đề gì khi xác thực, xin hãy trực tiếp phản hồi thông qua địa chỉ email này, chúng tôi sẽ liên hệ đến bạn trong thời gian sớm nhất!'
      }
  };
  var emailBody = mailGenerator.generate(email);
  return emailBody
  }
}

