import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { resetPassResponse } from 'src/user/entities/resetPass.entity';
import { Token } from 'src/user/entities/token.entity';

@Injectable()
export class MailService {
  private transporter;
  private mailConfig;

  constructor() {
    this.mailConfig = {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };

    this.transporter = nodemailer.createTransport(this.mailConfig);
  }

  async sendResetMail(token: Token): Promise<resetPassResponse> {
    const mailOptions = {
      from: '"Support Team" <support@example.com>', // dirección del remitente
      to: token.email, // lista de destinatarios
      subject: 'Password Reset', // línea de asunto
      html: `<p>Hola <b>${token.nombreuser}</b> Para restablecer la contraseña, usa el siguiente código: <b>${token.token}</b></p>`, // cuerpo del correo electrónico
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return {
        message: `Token de restablecimiento de contraseña enviado a ${token.email}`,
      };
    } catch (error) {
      return {
        message: 'Error al enviar el correo',
      };
    }
  }
}
