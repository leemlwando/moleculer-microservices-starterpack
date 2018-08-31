const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.EMAIL_API_KEY);

module.exports = (params)=>{

    console.log(params)

    
            const msg = {
                to: params.email,
                from: process.env.CONFIRM_USER_ADMIN_EMAIL,
                subject: 'MICROTECH VERIFICATION TOKEN ',
                text:params.token,
                html: `<html><body>
                          <a href="http://127.0.0.1:3000/api/auth/confirmuser?token=${params.token}">click here to confirm email</a><br>
                            <a href="http://127.0.0.1:3000/api/auth/resendtoken?expired_token=${params.token}&email=${params.email}">resend token</a>
                          </body></html>`,
              };
              console.log('......email sent')
             return sgMail.send(msg).then(res=>{return res}).catch(error=>console.log(error));
        
   
}



