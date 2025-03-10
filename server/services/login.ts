import { generate6DigitCode } from '@/lib/auth/authOptions';
import { prisma } from '@/prisma/prisma';
import { EmailParams, Sender, Recipient, MailerSend } from 'mailersend';

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_TOKEN as string,
});

export async function sendOTP(email: string) {
  const code = generate6DigitCode();
  await prisma.verificationToken.upsert({
    where: { identifier_token: { identifier: email, token: code } },
    update: {
      token: code,
      expires: new Date(Date.now() + 3 * 60 * 1000),
    },
    create: {
      identifier: email,
      token: code,
      expires: new Date(Date.now() + 3 * 60 * 1000),
    },
  });

  const sender = new Sender(
    process.env.EMAIL_FROM as string,
    "Avalanche Builder's Hub"
  );
  const recipients = [new Recipient(email, 'Usuario')];

  const emailParams = new EmailParams({
    from: sender,
    to: recipients,

    subject: 'Verify your account',
    text: `Your verification code is: ${code}. It expires in 3 minutes.`,
    html: `<p>Your verification code is: <strong>${code}</strong>. It expires in 3 minutes.</p>`,
  });

  try {
    await mailersend.email.send(emailParams);
  } catch (error) {
    throw new Error('Error sending email');
  }
}
