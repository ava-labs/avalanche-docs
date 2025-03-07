import { NextAuthOptions, DefaultSession, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import TwitterProvider from "next-auth/providers/twitter";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { prisma } from "../../prisma/prisma"; 
import { JWT } from "next-auth/jwt";
import { VerifyOTPResult } from "@/types/verifyOtpResult";



declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      avatar?: string;
    } & DefaultSession["user"];
  }
  interface JWT {
    id?: string;
    avatar?: string;
  }
}

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_TOKEN as string,
});

async function verifyOTP(email: string, code: string): Promise<VerifyOTPResult> {
  const record = await prisma.verificationToken.findFirst({
    where: { identifier: email, token: code },
  });

  if (record == null) {  
    return { isValid: false, reason: "NOT_FOUND" };

  }
  if (record.expires < new Date()) {
    await prisma.verificationToken.delete({
      where: { identifier_token: { identifier: email, token: record.token } },
    });
    return { isValid: false, reason: "EXPIRED" };
  }

  if (record.token !== code) {
    return { isValid: false, reason: "INVALID" };
  }
  await prisma.verificationToken.delete({
    where: { identifier_token: { identifier: email, token: record.token } },
  });
  return { isValid: true };
}

function generate6DigitCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const AuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        const { email, otp } = credentials ?? {};

        if (!email) throw new Error("missing email");

        if (!otp) {
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
          const recipients = [new Recipient(email, "Usuario")];

          const emailParams = new EmailParams({
            from: sender,
            to: recipients,
          
            subject: "Verify your account",
            text: `Your verification code is: ${code}. It expires in 3 minutes.`,
            html: `<p>Your verification code is: <strong>${code}</strong>. It expires in 3 minutes.</p>`,
            
          });

          try {
            await mailersend.email.send(emailParams);
       
          } catch (error) {
         
            throw new Error("ERROR SENDING MAIL");
          }

          throw new Error("OTP SENT");
        }
        const result = await verifyOTP(email, otp);
       
      
        if (!result.isValid) {
          if (result.reason === "EXPIRED") {
            throw new Error("EXPIRED");
          } else if (result.reason === "NOT_FOUND" || result.reason === "INVALID") {
            throw new Error("INVALID");
          } else {
            throw new Error("ERROR");
          }
        }

        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          user = await prisma.user.create({
            data: { email, name: "", image: "" },
          });
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("desde callback");
      console.log(user);
      console.log(account);
      if (account?.provider === "credentials") {
        let existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          existingUser = await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name || "",
              image: user.image || "",
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user }: { token: JWT; user?: any }): Promise<JWT> {
      if (user) {
        token.id = user.id;
        token.avatar = user.image;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (!session.user) {
        session.user = { name: "", email: "", image: "" };
      }
      session.user.id = token.id as string;
      session.user.avatar = token.avatar as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};